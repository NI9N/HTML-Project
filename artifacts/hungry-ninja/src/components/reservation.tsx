import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarDays, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const reservationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  date: z.string().min(1),
  time: z.string().min(1),
  partySize: z.coerce.number().int().min(1).max(20),
  notes: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const TIME_SLOTS = [
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30", "18:00", "18:30",
];

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

export function Reservation() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { partySize: 2 },
  });

  const onSubmit = async (data: ReservationForm) => {
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      toast({
        title: t("reserve.errorTitle"),
        description: t("reserve.errorDesc"),
        variant: "destructive",
      });
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-white/5 border ${hasError ? "border-red-400" : "border-white/20"} rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors`;

  return (
    <section id="reserve" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-white mb-4">
              {t("reserve.title")}
            </h2>
            <p className="text-white/60 text-lg">{t("reserve.subtitle")}</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="font-serif font-bold text-2xl text-white mb-3">
                {t("reserve.successTitle")}
              </h3>
              <p className="text-white/60 mb-8">{t("reserve.successDesc")}</p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-primary hover:bg-[#B02222] text-white font-bold px-8"
              >
                {t("reserve.another")}
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                    <User size={14} /> {t("reserve.name")}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={t("reserve.namePlaceholder")}
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                    <Phone size={14} /> {t("reserve.phone")}
                  </label>
                  <input
                    {...register("phone")}
                    placeholder={t("reserve.phonePlaceholder")}
                    className={inputClass(!!errors.phone)}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                  <Mail size={14} /> {t("reserve.email")}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={t("reserve.emailPlaceholder")}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{t("reserve.emailError")}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                    <CalendarDays size={14} /> {t("reserve.date")}
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    min={getTodayString()}
                    className={inputClass(!!errors.date) + " [color-scheme:dark]"}
                  />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                    <Clock size={14} /> {t("reserve.time")}
                  </label>
                  <select
                    {...register("time")}
                    className={inputClass(!!errors.time) + " cursor-pointer"}
                    defaultValue=""
                  >
                    <option value="" disabled>{t("reserve.selectTime")}</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#1A1A1A]">{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-400 text-xs mt-1">{t("reserve.required")}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                    <Users size={14} /> {t("reserve.partySize")}
                  </label>
                  <select
                    {...register("partySize")}
                    className={inputClass(!!errors.partySize) + " cursor-pointer"}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-[#1A1A1A]">
                        {n} {n === 1 ? t("reserve.person") : t("reserve.people")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm font-medium mb-2">
                  <MessageSquare size={14} /> {t("reserve.notes")}
                </label>
                <textarea
                  {...register("notes")}
                  placeholder={t("reserve.notesPlaceholder")}
                  rows={3}
                  className={inputClass(false) + " resize-none"}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-[#B02222] text-white font-bold text-lg py-6 rounded-lg shadow-[0_4px_20px_rgba(212,43,43,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60"
              >
                {isSubmitting ? t("reserve.submitting") : t("reserve.submit")}
              </Button>

              <p className="text-center text-white/40 text-sm">{t("reserve.callNote")}</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
