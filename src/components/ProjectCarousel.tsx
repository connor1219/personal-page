import { Box, IconButton, Paper } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ProjectInfoCard, { ProjectInfoCardProps } from "./ProjectInfoCard";

type ProjectCarouselProps = {
  items: ProjectInfoCardProps[];
  resetTrigger?: number;
};

export type ProjectCarouselRef = {
  triggerCategoryTransition: (callback: () => void) => void;
};

const ProjectCarousel = forwardRef<ProjectCarouselRef, ProjectCarouselProps>(({ items, resetTrigger }, ref) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const count = items.length;

  const handleTransition = useCallback((newIndex: number) => {
    if (newIndex === index || isTransitioning) return;
    
    setIsTransitioning(true);
    // Start fade out, then change content immediately (no decoding delay)
    setTimeout(() => {
      setIndex(newIndex);
      // Fade back in immediately since images are preloaded
      setTimeout(() => {
        setIsTransitioning(false);
      }, 20); // Minimal delay to ensure DOM update
    }, 120); // Reduced fade out duration
  }, [index, isTransitioning]);

  const handleCategoryTransition = useCallback((callback: () => void) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // Start fade out, then execute callback (category change) during fade
    setTimeout(() => {
      callback(); // This will change the category and trigger resetTrigger
      setIndex(0); // Reset to first slide
      // Fade back in after category change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 20); // Minimal delay to ensure DOM update
    }, 120); // Fade out duration
  }, [isTransitioning]);

  useImperativeHandle(ref, () => ({
    triggerCategoryTransition: handleCategoryTransition,
  }), [handleCategoryTransition]);

  const handlePrev = useCallback(() => {
    const newIndex = (index - 1 + count) % count;
    handleTransition(newIndex);
  }, [index, count, handleTransition]);
  
  const handleNext = useCallback(() => {
    const newIndex = (index + 1) % count;
    handleTransition(newIndex);
  }, [index, count, handleTransition]);

  useEffect(() => {
    // Reset to first slide when items change (handled by parent transition now)
    setIndex(0);
  }, [resetTrigger]);

  if (count === 0) return null;

  return (
    <Box role="region" aria-label="Projects">
      {/* Desktop Layout */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, justifyContent: "center", mt: 2, alignItems: "center" }}>
        <IconButton aria-label="Previous" onClick={handlePrev} disabled={count <= 1}>
          <ArrowBackIosNew sx={{ fontSize: 32 }} />
        </IconButton>

        <Paper 
          elevation={3} 
          sx={{ 
            position: "relative", 
            width: "100%", 
            overflow: "hidden", 
            borderRadius: 2
          }}
        >
          {items.map((item, i) => (
            <Box
              key={`slide-${i}`}
              sx={{
                opacity: isTransitioning ? 0.3 : 1,
                transition: "opacity 0.12s ease-in-out",
                visibility: i === index ? "visible" : "hidden",
                position: i === index ? "relative" : "absolute",
                top: i === index ? 0 : 0,
                left: i === index ? 0 : -9999,
                width: "100%",
              }}
            >
              <ProjectInfoCard {...item} priority={true} />
            </Box>
          ))}
        </Paper>

        <IconButton aria-label="Next" onClick={handleNext} disabled={count <= 1}>
          <ArrowForwardIos sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      {/* Desktop Navigation */}
      <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, gap: 1, justifyContent: "center", mt: 2 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTransition(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "rgba(0,0,0,0.54)" : "rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      {/* Mobile Layout */}
      <Box sx={{ display: { xs: "block", md: "none" }, px: "8px", mt: 2 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            position: "relative", 
            width: "100%", 
            overflow: "hidden", 
            borderRadius: 2
          }}
        >
          {items.map((item, i) => (
            <Box
              key={`slide-${i}`}
              sx={{
                opacity: isTransitioning ? 0.3 : 1,
                transition: "opacity 0.12s ease-in-out",
                visibility: i === index ? "visible" : "hidden",
                position: i === index ? "relative" : "absolute",
                top: i === index ? 0 : 0,
                left: i === index ? 0 : -9999,
                width: "100%",
              }}
            >
              <ProjectInfoCard {...item} priority={true} />
            </Box>
          ))}
        </Paper>

        {/* Mobile Navigation with inline arrows */}
        <Box component="nav" sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, gap: 2 }}>
          <IconButton 
            aria-label="Previous" 
            onClick={handlePrev} 
            disabled={count <= 1}
            sx={{ p: 1 }}
          >
            <ArrowBackIosNew sx={{ fontSize: 24 }} />
          </IconButton>

          <Box sx={{ display: "flex", gap: 1 }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTransition(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "none",
                  background: i === index ? "rgba(0,0,0,0.54)" : "rgba(0,0,0,0.12)",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>

          <IconButton 
            aria-label="Next" 
            onClick={handleNext} 
            disabled={count <= 1}
            sx={{ p: 1 }}
          >
            <ArrowForwardIos sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

ProjectCarousel.displayName = 'ProjectCarousel';

export default ProjectCarousel;
