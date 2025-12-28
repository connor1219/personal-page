"use client";

import { Box, Paper } from "@mui/material";
import { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ProjectInfoCard, { ProjectInfoCardProps } from "./ProjectInfoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProjectCarouselProps = {
  items: ProjectInfoCardProps[];
  resetTrigger?: number;
};

export type ProjectCarouselRef = {
  triggerCategoryTransition: (callback: () => void) => void;
};

const ProjectCarousel = forwardRef<ProjectCarouselRef, ProjectCarouselProps>(
  ({ items, resetTrigger }, ref) => {
    const [desktopApi, setDesktopApi] = useState<CarouselApi>();
    const [mobileApi, setMobileApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Track desktop API and update current state
    useEffect(() => {
      if (!desktopApi) {
        return;
      }

      setCount(desktopApi.scrollSnapList().length);
      setCurrent(desktopApi.selectedScrollSnap() + 1);

      const onSelect = () => {
        if (desktopApi) {
          setCurrent(desktopApi.selectedScrollSnap() + 1);
        }
      };

      desktopApi.on("select", onSelect);

      return () => {
        desktopApi.off("select", onSelect);
      };
    }, [desktopApi]);

    // Track mobile API and update current state
    useEffect(() => {
      if (!mobileApi) {
        return;
      }

      setCount(mobileApi.scrollSnapList().length);
      setCurrent(mobileApi.selectedScrollSnap() + 1);

      const onSelect = () => {
        if (mobileApi) {
          setCurrent(mobileApi.selectedScrollSnap() + 1);
        }
      };

      mobileApi.on("select", onSelect);

      return () => {
        mobileApi.off("select", onSelect);
      };
    }, [mobileApi]);

    useEffect(() => {
      // Reset both carousels when items change
      if (desktopApi) {
        desktopApi.scrollTo(0);
      }
      if (mobileApi) {
        mobileApi.scrollTo(0);
      }
      setCurrent(1);
    }, [resetTrigger, desktopApi, mobileApi]);

    const handleCategoryTransition = useCallback(
      (callback: () => void) => {
        if (isTransitioning || (!desktopApi && !mobileApi)) return;

        setIsTransitioning(true);
        // Start fade out, then execute callback (category change) during fade
        setTimeout(() => {
          callback(); // This will change the category and trigger resetTrigger
          // Fade back in after category change
          setTimeout(() => {
            setIsTransitioning(false);
          }, 20);
        }, 120); // Fade out duration
      },
      [isTransitioning, desktopApi, mobileApi]
    );

    useImperativeHandle(
      ref,
      () => ({
        triggerCategoryTransition: handleCategoryTransition,
      }),
      [handleCategoryTransition]
    );

    const handleDotClick = useCallback(
      (index: number, isMobile: boolean = false) => {
        const targetApi = isMobile ? mobileApi : desktopApi;
        if (!targetApi || isTransitioning) return;
        targetApi.scrollTo(index);
      },
      [desktopApi, mobileApi, isTransitioning]
    );

    if (items.length === 0) return null;

    return (
      <Box role="region" aria-label="Projects">
        {/* Desktop Layout */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            justifyContent: "center",
            mt: 2,
            alignItems: "center",
          }}
        >
          {/* Invisible spacer to match original IconButton width */}
          <Box sx={{ width: 48, flexShrink: 0, visibility: "hidden" }} />
          <Box sx={{ flex: "1 1 auto", minWidth: 0, maxWidth: "100%" }}>
            <Carousel
              setApi={setDesktopApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <CarouselContent className="-ml-2">
                {items.map((item, index) => (
                  <CarouselItem key={`slide-${index}`} className="pl-2 basis-full">
                    <div
                      className={cn(
                        "transition-opacity duration-150",
                        isTransitioning ? "opacity-30" : "opacity-100"
                      )}
                    >
                      <ProjectInfoCard {...item} priority={index === 0} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Paper>
            {items.length > 1 && (
              <>
                <CarouselPrevious className="left-0 md:left-[-3rem] h-8 w-8" />
                <CarouselNext className="right-0 md:right-[-3rem] h-8 w-8" />
              </>
            )}
            </Carousel>
          </Box>
          {/* Invisible spacer to match original IconButton width */}
          <Box sx={{ width: 48, flexShrink: 0, visibility: "hidden" }} />
        </Box>

        {/* Desktop Navigation Dots */}
        {items.length > 1 && (
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
              mt: 2,
            }}
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i, false)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current - 1}
                className={cn(
                  "w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-colors",
                  i === current - 1
                    ? "bg-[rgba(0,0,0,0.54)]"
                    : "bg-[rgba(0,0,0,0.12)]"
                )}
              />
            ))}
          </Box>
        )}

        {/* Mobile Layout */}
        <Box sx={{ display: { xs: "block", md: "none" }, px: "8px", mt: 2 }}>
          <Carousel
            setApi={setMobileApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <CarouselContent className="-ml-2">
                {items.map((item, index) => (
                  <CarouselItem key={`slide-${index}`} className="pl-2 basis-full">
                    <div
                      className={cn(
                        "transition-opacity duration-150",
                        isTransitioning ? "opacity-30" : "opacity-100"
                      )}
                    >
                      <ProjectInfoCard {...item} priority={index === 0} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Paper>
          </Carousel>

          {/* Mobile Navigation with inline arrows and dots */}
          {items.length > 1 && (
            <Box
              component="nav"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                gap: 2,
              }}
            >
              <button
                aria-label="Previous"
                onClick={() => mobileApi?.scrollPrev()}
                disabled={current === 1}
                className={cn(
                  "p-2 rounded-full border-none cursor-pointer transition-opacity",
                  "hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed",
                  "flex items-center justify-center"
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <Box sx={{ display: "flex", gap: 1 }}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i, true)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === current - 1}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-colors",
                      i === current - 1
                        ? "bg-[rgba(0,0,0,0.54)]"
                        : "bg-[rgba(0,0,0,0.12)]"
                    )}
                  />
                ))}
              </Box>

              <button
                aria-label="Next"
                onClick={() => mobileApi?.scrollNext()}
                disabled={current === count}
                className={cn(
                  "p-2 rounded-full border-none cursor-pointer transition-opacity",
                  "hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed",
                  "flex items-center justify-center"
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

ProjectCarousel.displayName = "ProjectCarousel";

export default ProjectCarousel;
