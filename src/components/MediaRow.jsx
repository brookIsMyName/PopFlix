import { useEffect, useId, useRef, useState } from "react";

export default function MediaRow({ title, children, action }) {
  const track = useRef(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const element = track.current;
    const update = () => setEdges({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, [children]);
  const scroll = (direction) => track.current.scrollBy({
    left: direction * track.current.clientWidth * 0.9,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
  return (
    <section className="movie-row" aria-labelledby={`${id}-title`}>
      <div className="movie-row-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        {action}
        <div className="movie-row-controls">
          <button type="button" aria-label={`Previous titles in ${title}`} aria-controls={id} disabled={edges.start} onClick={() => scroll(-1)}>‹</button>
          <button type="button" aria-label={`Next titles in ${title}`} aria-controls={id} disabled={edges.end} onClick={() => scroll(1)}>›</button>
        </div>
      </div>
      <div id={id} ref={track} className="movie-row-track" tabIndex={0} aria-label={`${title} titles`}>
        {children}
      </div>
    </section>
  );
}
