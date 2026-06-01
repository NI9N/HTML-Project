---
name: framer-motion whileInView in iframes
description: Why whileInView with initial opacity:0 causes invisible elements in Replit preview iframes, and the correct pattern to use instead.
---

# framer-motion whileInView in Replit iframes

## The Rule

Never use `whileInView` + `initial="hidden"` (opacity:0) on individual content cards in apps that will be viewed inside the Replit preview iframe. The IntersectionObserver that framer-motion uses does not reliably fire inside iframes, causing elements to stay permanently invisible.

**Why:** The Replit canvas preview pane renders the app inside an `<iframe>`. framer-motion's `whileInView` relies on IntersectionObserver with the element's root viewport. Inside an iframe the observer sometimes never fires, so elements with `initial={{ opacity: 0 }}` stay invisible indefinitely — this looks like images or content "not loading."

**How to apply:**
- For section wrappers (large blocks), `whileInView` is fine — the section itself is large enough that the observer usually fires.
- For individual cards/items within a grid, use `animate="visible"` directly (not `whileInView`), combined with `AnimatePresence` for exit animations. This guarantees the animation runs as soon as the component mounts.
- Keep `whileInView` on the section wrapper for a subtle entrance effect on the container.
- Add an `onError` retry handler on `<img>` tags that appends a cache-busting timestamp on first failure.
- Preload critical images at module level with `new Image()` to warm the cache before the component renders.

## Correct Pattern (from Hungry Ninja menu fix)

```tsx
// Section wrapper — whileInView OK here
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={sectionVariants}
  className="grid ..."
>
  <AnimatePresence mode="popLayout">
    {items.map((item, index) => (
      // Individual cards — use animate, NOT whileInView
      <motion.div
        key={item.id}
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"   // <-- this, not whileInView
        exit="exit"
        transition={{ delay: index * 0.08 }}
      >
        <img
          src={item.image}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.retried !== "1") {
              img.dataset.retried = "1";
              img.src = `${item.image}?_t=${Date.now()}`;
            }
          }}
        />
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
```
