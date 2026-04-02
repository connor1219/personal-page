import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import ProjectCarousel from "@/components/ProjectCarousel";
import PitchColumn from "@/components/PitchColumn";
import FishingColumn from "@/components/FishingColumn";
import FishCallout from "@/components/FishCallout";
import { PenAccentProvider } from "@/contexts/PenAccentContext";
import { PEN_ACCENT_MUI } from "@/lib/brandColors";
import { PROJECTS, Category } from "@/data/projects";
import blurData from "@/data/blurData";

const Home = () => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [resetCounter, setResetCounter] = useState(0);
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);

  const penAccent = useMemo(() => {
    const list =
      category === Category.FISHING
        ? PROJECTS[Category.FISHING]
        : PROJECTS[Category.GENERAL];
    const i = Math.min(Math.max(0, carouselSlideIndex), list.length - 1);
    return list[i].penAccent ?? PEN_ACCENT_MUI;
  }, [category, carouselSlideIndex]);

  const handleFishClick = () => {
    const newCategory = category === Category.GENERAL ? Category.FISHING : Category.GENERAL;
    setCategory(newCategory);
    setResetCounter(prev => prev + 1);
    setCarouselSlideIndex(0);
  };

  const icons = [
    { src: "/icon/rainbow-trout.png", alt: "Fishing", showWhen: Category.GENERAL },
    { src: "/icon/mac.png", alt: "Mac", showWhen: Category.FISHING },
  ] as const;

  return (
    <PenAccentProvider value={penAccent}>
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        pb: {
          xs: "calc(24px + env(safe-area-inset-bottom, 0px))",
          md: "env(safe-area-inset-bottom, 0px)",
        },
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          pt: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              flex: { xs: "0 0 auto", md: "1 1 50%" },
              minWidth: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: { xs: "center", md: "flex-start" },
              px: { xs: 3, md: 4 },
              pt: { xs: 2, md: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                gap: 2,
                maxWidth: 620,
                width: "100%",
              }}
            >
              {category === Category.GENERAL ? <PitchColumn /> : <FishingColumn />}
            </Box>
          </Box>

          <Box
            sx={{
              flex: { xs: "0 0 auto", md: "1 1 75%" },
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              px: 3,
              py: { xs: 2, md: 0 },
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "100%", position: "relative" }}>
              {Object.values(Category).map((cat) => (
                <div
                  key={cat}
                  style={{
                    position: cat === category ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    visibility: cat === category ? "visible" : "hidden",
                    pointerEvents: cat === category ? "auto" : "none",
                  }}
                >
                  <ProjectCarousel
                    items={PROJECTS[cat].map(
                      ({ penAccent: _pen, id: _id, ...item }) => ({
                        ...item,
                        blurDataURL: blurData[item.imageSrc],
                      })
                    )}
                    resetTrigger={cat === category ? resetCounter : undefined}
                    onSlideIndexChange={
                      cat === category ? setCarouselSlideIndex : undefined
                    }
                  />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <FishCallout category={category} onFishClick={handleFishClick} icons={icons} />
    </Box>
    </PenAccentProvider>
  );
};

export default Home;
