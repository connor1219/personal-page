import { Box, IconButton, Paper } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import ProjectInfoCard, { ProjectInfoCardProps } from "./ProjectInfoCard";

type ProjectCarouselProps = {
  items: ProjectInfoCardProps[];
  resetTrigger?: number;
};

const ProjectCarousel = ({ items, resetTrigger }: ProjectCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const count = items.length;

  const handleTransition = useCallback((newIndex: number) => {
    if (newIndex === index || isTransitioning) return;
    
    setIsTransitioning(true);
    // Start fade out, then change content after a brief delay
    setTimeout(() => {
      setIndex(newIndex);
      // Fade back in after content change
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50); // Brief delay to ensure content has updated
    }, 150); // Fade out duration
  }, [index, isTransitioning]);

  const handlePrev = useCallback(() => {
    const newIndex = (index - 1 + count) % count;
    handleTransition(newIndex);
  }, [index, count, handleTransition]);
  
  const handleNext = useCallback(() => {
    const newIndex = (index + 1) % count;
    handleTransition(newIndex);
  }, [index, count, handleTransition]);

  useEffect(() => {
    setIndex(0);
  }, [resetTrigger]);

  if (count === 0) return null;
  const current = items[index];

  return (
    <Box role="region" aria-label="Projects">
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2, alignItems: "center" }}>
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
          <Box
            sx={{
              opacity: isTransitioning ? 0.3 : 1,
              transition: "opacity 0.15s ease-in-out"
            }}
          >
            <ProjectInfoCard {...current} />
          </Box>
        </Paper>

        <IconButton aria-label="Next" onClick={handleNext} disabled={count <= 1}>
          <ArrowForwardIos sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      <Box component="nav" sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTransition(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            disabled={isTransitioning}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "rgba(0,0,0,0.54)" : "rgba(0,0,0,0.12)",
              cursor: isTransitioning ? "default" : "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectCarousel;
