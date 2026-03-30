import { Box, IconButton, Link, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CodeIcon from "@mui/icons-material/Code";
import DevicesIcon from "@mui/icons-material/Devices";
import SchoolIcon from "@mui/icons-material/School";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import ProjectCarousel from "@/components/ProjectCarousel";
import { PROJECTS, Category } from "@/data/projects";
import blurData from "@/data/blurData";

const Home = () => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [resetCounter, setResetCounter] = useState(0);

  const handleFishClick = () => {
    const newCategory = category === Category.GENERAL ? Category.FISHING : Category.GENERAL;
    setCategory(newCategory);
    setResetCounter(prev => prev + 1);
  };

  const getTitle = () => {
    if (category === Category.FISHING) {
      return "Fisherman";
    }
    return "Software Developer";
  };

  const icons = [
    { src: "/icon/rainbow-trout.png", alt: "Fishing", showWhen: Category.GENERAL },
    { src: "/icon/mac.png", alt: "Mac", showWhen: Category.FISHING },
  ] as const;

     return (
     <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
         <Box sx={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",
                        height: "100%",
                        width: "100vw",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            flex: { xs: "0 0 auto", md: "1 1 50%" },
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { xs: 3, md: 1.5 },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 2,
                                maxWidth: 620,
                                width: "100%",
                                marginTop: { xs: 10, md: 0 },
                            }}
                        >
                                                         <Typography variant="h3">Connor Morgan</Typography>
                             <Typography variant="h6">
                                 {getTitle()}
                             </Typography>
                            <Typography variant="h6" sx={{ mt: -2 }}>
                            Toronto, ON
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, color: "primary.main" }}>
                                <Link
                                    href="https://www.linkedin.com/in/connor-morgan-custom"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={24} />
                                </Link>
                                <Link
                                    href="https://github.com/connor1219"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={24} />
                                </Link>
                                <Link
                                    href="mailto:connormorgan@live.ca?subject=Hey%20Connor&body=Hey%20Connor%2C%0A%0AAwesome%20fish%20pics%20man"
                                    aria-label="Email"
                                >
                                    <FaEnvelope size={24} />
                                </Link>
                            </Box>
                            {category === Category.GENERAL && (
                                <>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            maxWidth: 420,
                                            lineHeight: 1.6,
                                            mt: 1,
                                        }}
                                    >
                                        I&apos;m the person you hand a messy problem to and trust that it&apos;ll ship. I&apos;ll define the approach, build it, deploy it, and keep it running.
                                    </Typography>
                                    <Box sx={{ mt: 3, width: "100%" }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 700,
                                                letterSpacing: 0.08,
                                                textTransform: "uppercase",
                                                textAlign: "center",
                                                mb: 1.5,
                                            }}
                                        >
                                            About Me
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                                gap: 1.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    backgroundColor: "background.paper",
                                                    boxShadow: (theme) => theme.shadows[1],
                                                }}
                                            >
                                                <Box sx={{ mt: 0.25 }}>
                                                    <BarChartIcon sx={{ color: "primary.main" }} />
                                                </Box>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                                  Built and operate a software driven resale business, generating <Box component="span" sx={{ fontWeight: 700 }}> $450,000+ </Box> in revenue by reselling high demand, limited supply goods
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    backgroundColor: "background.paper",
                                                    boxShadow: (theme) => theme.shadows[1],
                                                }}
                                            >
                                                <Box sx={{ mt: 0.25 }}>
                                                    <CodeIcon sx={{ color: "primary.main" }} />
                                                </Box>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                                  Currently working as a Full Stack Developer at <Link href="https://www.valueconnect.ca" target="_blank" rel="noopener noreferrer">Value Connect</Link>, leading all development across the frontend, backend, and infrastructure
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    backgroundColor: "background.paper",
                                                    boxShadow: (theme) => theme.shadows[1],
                                                }}
                                            >
                                                <Box sx={{ mt: 0.25 }}>
                                                    <DevicesIcon sx={{ color: "primary.main" }} />
                                                </Box>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                                   My latest passion project is  <Link href="https://app.devply.ca/landing" target="_blank" rel="noopener noreferrer">Devply</Link> (you should check it out!)
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 1.5,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    backgroundColor: "background.paper",
                                                    boxShadow: (theme) => theme.shadows[1],
                                                }}
                                            >
                                                <Box sx={{ mt: 0.25 }}>
                                                    <SchoolIcon sx={{ color: "primary.main" }} />
                                                </Box>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                                    University of Guelph Computer Science
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: { xs: "0 0 auto", md: "1 1 75%" },
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                                        items={PROJECTS[cat].map(item => ({
                                            ...item,
                                            blurDataURL: blurData[item.imageSrc],
                                        }))}
                                        resetTrigger={cat === category ? resetCounter : undefined}
                                    />
                                </div>
                            ))}
                        </Box>
                    </Box>
                                </Box>


        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleFishClick} sx={{ position: "relative", width: 80, height: 80 }}>
                {icons.map(({ src, alt, showWhen }) => (
                    <Image
                        key={src}
                        src={src}
                        alt={alt}
                        width={64}
                        height={64}
                        unoptimized
                        priority
                        style={{
                            position: "absolute",
                            visibility: category === showWhen ? "visible" : "hidden",
                        }}
                    />
                ))}
            </IconButton>
        </Box>
    </Box>
  );
};

export default Home;
