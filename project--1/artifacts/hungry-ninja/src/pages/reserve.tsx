import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, ArrowRight, CalendarDays, Clock, Users,
  User, Mail, Phone, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanternIcon } from "@/components/decorative";
import { useToast } from "@/hooks/use-toast";

const TIME_SLOTS = [
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30",
];

const step1Schema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  partySize: z.number().int().min(1).max(20),
});

const step2Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  notes: z.string().optional(),
});

const fullSchema = step1Schema.merge(step2Schema);
type FullForm = z.infer<typeof fullSchema>;

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function CalendarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getCalendarDays(viewYear, viewMonth);
  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const toDateStr = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isPast = (d: number) => toDateStr(d) < getTodayString();
  const isSelected = (d: number) => toDateStr(d) === value;
  const isToday = (d: number) => toDateStr(d) === getTodayString();
  const isClosed = (d: number) => {
    const dow = new Date(viewYear, viewMonth, d).getDay();
    return dow === 0 || dow === 1;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <ChevronLeft size={18} />
        </button>
        <span className="text-white font-semibold text-sm">{monthName}</span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-center text-xs text-white/30 font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div key={i}>
            {d === null ? (
              <div />
            ) : (
              <button
                type="button"
                disabled={isPast(d) || isClosed(d)}
                onClick={() => !isPast(d) && !isClosed(d) && onChange(toDateStr(d))}
                className={`w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                  ${isPast(d) || isClosed(d) ? "text-white/20 cursor-not-allowed line-through decoration-white/20" :
                    isSelected(d) ? "bg-primary text-white shadow-[0_0_12px_rgba(212,43,43,0.5)]" :
                    isToday(d) ? "border border-primary/50 text-primary hover:bg-primary/20" :
                    "text-white/70 hover:bg-white/10 hover:text-white"}`}
              >
                {d}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const { t } = useTranslation();
  const steps = [t("reserve.step1Label"), t("reserve.step2Label"), t("reserve.step3Label")];
  return (
    <div className="flex items-center gap-0 mb-10 max-w-xs mx-auto">
      {steps.map((label, i) => (
        <div key={i} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                backgroundColor: i < step ? "#D42B2B" : i === step ? "#D42B2B" : "rgba(255,255,255,0.1)",
                scale: i === step ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white relative z-10"
            >
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </motion.div>
            <span className={`text-xs mt-1.5 font-medium whitespace-nowrap transition-colors duration-300 ${i <= step ? "text-white/80" : "text-white/30"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-px mx-2 mb-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <motion.div
                animate={{ scaleX: i < step ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-primary"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function ReservePage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<FullForm>>({ partySize: 2 });

  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: { partySize: formData.partySize ?? 2, date: formData.date ?? "", time: formData.time ?? "" },
  });

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { name: formData.name ?? "", email: formData.email ?? "", phone: formData.phone ?? "", notes: formData.notes ?? "" },
  });

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goPrev = () => { setDir(-1); setStep(s => s - 1); };

  const handleStep1 = step1Form.handleSubmit((data) => {
    setFormData(prev => ({ ...prev, ...data }));
    goNext();
  });

  const handleStep2 = step2Form.handleSubmit((data) => {
    setFormData(prev => ({ ...prev, ...data }));
    goNext();
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_1waw47m",
          template_id: "template_clv0ay2",
          user_id: "nUu_JU11NEHQkImEY",
          template_params: {
            date: formData.date ?? "",
            time: formData.time ?? "",
            partySize: String(formData.partySize ?? ""),
            name: formData.name ?? "",
            email: formData.email ?? "",
            phone: formData.phone ?? "",
            notes: formData.notes ?? "",
          },
        }),
      });
      setSubmitted(true);
      toast({ title: t("reserve.successTitle"), description: t("reserve.successDesc") });
    } catch {
      // Fallback: save to localStorage (works offline)
      try {
        const saved = JSON.parse(localStorage.getItem("hungry-ninja-reservations") || "[]");
        saved.push({ ...formData, id: Date.now(), status: "confirmed", createdAt: new Date().toISOString() });
        localStorage.setItem("hungry-ninja-reservations", JSON.stringify(saved));
        setSubmitted(true);
        toast({ title: t("reserve.successTitle"), description: "Saved locally (demo mode)" });
      } catch {
        toast({ title: t("reserve.errorTitle"), description: t("reserve.errorDesc"), variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedDate = step1Form.watch("date");
  const watchedTime = step1Form.watch("time");
  const watchedPartySize = step1Form.watch("partySize");

  const inputClass = (hasError: boolean) =>
    `w-full bg-white/5 border ${hasError ? "border-red-400" : "border-white/15"} rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all duration-200`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              >
                <LanternIcon className="w-12 h-auto opacity-90" />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30"
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="font-serif font-black text-4xl text-white mb-3">{t("reserve.successTitle")}</h2>
          <p className="text-white/60 text-lg mb-2">{formatDate(formData.date ?? "")}</p>
          <p className="text-white/60 mb-8">
            {formData.time} · {formData.partySize} {Number(formData.partySize) === 1 ? t("reserve.person") : t("reserve.people")}
          </p>
          <p className="text-white/40 text-sm mb-8">{t("reserve.successDesc")}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setSubmitted(false); setStep(0); setFormData({ partySize: 2 }); step1Form.reset(); step2Form.reset(); }}
              className="bg-primary hover:bg-[#B02222] text-white font-bold px-6">
              {t("reserve.another")}
            </Button>
            <Button onClick={() => navigate("/")} variant="outline"
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 px-6">
              {t("reserve.backHome")}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] overflow-x-hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> {t("reserve.backHome")}
        </button>
        <div className="flex items-center gap-2">
          <LanternIcon className="w-8 h-auto" />
          <span className="font-serif font-black text-white text-lg tracking-wider uppercase">HUNGRY NINJA</span>
        </div>
        <div className="flex items-center gap-2.5">
          {([["en", "EN"], ["zh", "中"], ["ja", "日"]] as [string, string][]).map(([code, label]) => (
            <button
              key={code}
              onClick={() => i18n.changeLanguage(code)}
              className={`font-medium text-sm transition-colors ${i18n.language === code ? "text-white" : "text-white/50 hover:text-white/80"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-serif font-black text-4xl md:text-5xl text-white mb-3">{t("reserve.title")}</h1>
            <p className="text-white/50 text-base">{t("reserve.subtitle")}</p>
          </motion.div>

          <StepIndicator step={step} />

          <AnimatePresence mode="wait" custom={dir}>
            {/* ── Step 0: Date / Time / Party ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <form onSubmit={handleStep1} className="space-y-6">
                  {/* Calendar */}
                  <div>
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                      <CalendarDays size={13} /> {t("reserve.date")}
                    </label>
                    <CalendarPicker
                      value={watchedDate}
                      onChange={(v) => step1Form.setValue("date", v, { shouldValidate: true })}
                    />
                    {step1Form.formState.errors.date && (
                      <p className="text-red-400 text-xs mt-1.5">{t("reserve.required")}</p>
                    )}
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                      <Clock size={13} /> {t("reserve.time")}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => step1Form.setValue("time", slot, { shouldValidate: true })}
                          className={`py-2.5 px-1 rounded-lg text-sm font-medium transition-all duration-200
                            ${watchedTime === slot
                              ? "bg-primary text-white shadow-[0_0_10px_rgba(212,43,43,0.4)]"
                              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {step1Form.formState.errors.time && (
                      <p className="text-red-400 text-xs mt-1.5">{t("reserve.required")}</p>
                    )}
                  </div>

                  {/* Party size */}
                  <div>
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                      <Users size={13} /> {t("reserve.partySize")}
                    </label>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                      <button
                        type="button"
                        onClick={() => step1Form.setValue("partySize", Math.max(1, watchedPartySize - 1), { shouldValidate: true })}
                        className="w-9 h-9 rounded-full border border-white/20 text-white/70 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center text-xl font-light transition-all"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center">
                        <motion.span
                          key={watchedPartySize}
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-serif font-black text-4xl text-white block"
                        >
                          {watchedPartySize}
                        </motion.span>
                        <span className="text-white/40 text-sm">
                          {watchedPartySize === 1 ? t("reserve.person") : t("reserve.people")}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => step1Form.setValue("partySize", Math.min(20, watchedPartySize + 1), { shouldValidate: true })}
                        className="w-9 h-9 rounded-full border border-white/20 text-white/70 hover:border-primary hover:text-primary hover:bg-primary/10 flex items-center justify-center text-xl font-light transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button type="submit"
                    className="w-full bg-primary hover:bg-[#B02222] text-white font-bold text-base py-6 rounded-xl shadow-[0_4px_20px_rgba(212,43,43,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    {t("reserve.next")} <ArrowRight size={18} />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <form onSubmit={handleStep2} className="space-y-5">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-4 text-sm text-white/50">
                    <CalendarDays size={14} className="text-primary shrink-0" />
                    <span>{formatDate(formData.date ?? "")}</span>
                    <span className="text-white/20">·</span>
                    <Clock size={14} className="text-primary shrink-0" />
                    <span>{formData.time}</span>
                    <span className="text-white/20">·</span>
                    <Users size={14} className="text-primary shrink-0" />
                    <span>{formData.partySize}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                        <User size={12} /> {t("reserve.name")}
                      </label>
                      <input {...step2Form.register("name")} placeholder={t("reserve.namePlaceholder")}
                        className={inputClass(!!step2Form.formState.errors.name)} />
                      {step2Form.formState.errors.name && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                        <Phone size={12} /> {t("reserve.phone")}
                      </label>
                      <input {...step2Form.register("phone")} placeholder={t("reserve.phonePlaceholder")}
                        className={inputClass(!!step2Form.formState.errors.phone)} />
                      {step2Form.formState.errors.phone && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                      <Mail size={12} /> {t("reserve.email")}
                    </label>
                    <input {...step2Form.register("email")} type="email" placeholder={t("reserve.emailPlaceholder")}
                      className={inputClass(!!step2Form.formState.errors.email)} />
                    {step2Form.formState.errors.email && <p className="text-red-400 text-xs mt-1">{t("reserve.emailError")}</p>}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                      <MessageSquare size={12} /> {t("reserve.notes")}
                    </label>
                    <textarea {...step2Form.register("notes")} placeholder={t("reserve.notesPlaceholder")} rows={3}
                      className={inputClass(false) + " resize-none"} />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button type="button" onClick={goPrev} variant="outline"
                      className="flex-1 border-white/15 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/30 py-6 rounded-xl font-bold flex items-center justify-center gap-2">
                      <ArrowLeft size={16} /> {t("reserve.back")}
                    </Button>
                    <Button type="submit"
                      className="flex-1 bg-primary hover:bg-[#B02222] text-white font-bold py-6 rounded-xl shadow-[0_4px_20px_rgba(212,43,43,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                      {t("reserve.next")} <ArrowRight size={16} />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── Step 2: Review & Confirm ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="space-y-5">
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="bg-primary/10 border-b border-white/10 px-6 py-4">
                      <h3 className="font-serif font-bold text-white text-lg">{t("reserve.reviewTitle")}</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                      {[
                        { icon: <CalendarDays size={15} />, label: t("reserve.date"), value: formatDate(formData.date ?? "") },
                        { icon: <Clock size={15} />, label: t("reserve.time"), value: formData.time },
                        { icon: <Users size={15} />, label: t("reserve.partySize"), value: `${formData.partySize} ${Number(formData.partySize) === 1 ? t("reserve.person") : t("reserve.people")}` },
                        { icon: <User size={15} />, label: t("reserve.name"), value: formData.name },
                        { icon: <Phone size={15} />, label: t("reserve.phone"), value: formData.phone },
                        { icon: <Mail size={15} />, label: t("reserve.email"), value: formData.email },
                        ...(formData.notes ? [{ icon: <MessageSquare size={15} />, label: t("reserve.notes"), value: formData.notes }] : []),
                      ].map((row, i) => (
                        <div key={i} className="flex items-start gap-4 px-6 py-3.5">
                          <span className="text-primary mt-0.5 shrink-0">{row.icon}</span>
                          <span className="text-white/40 text-sm w-24 shrink-0">{row.label}</span>
                          <span className="text-white text-sm font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 text-sm text-white/50 text-center">
                    {t("reserve.callNote")}
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" onClick={goPrev} variant="outline"
                      className="flex-1 border-white/15 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/30 py-6 rounded-xl font-bold flex items-center justify-center gap-2">
                      <ArrowLeft size={16} /> {t("reserve.back")}
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-[#B02222] text-white font-bold py-6 rounded-xl shadow-[0_4px_20px_rgba(212,43,43,0.35)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60">
                      {isSubmitting ? t("reserve.submitting") : t("reserve.submit")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
