import { Box, Link, Typography } from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Image from "next/image";

export type ProjectInfoCardProps = {
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
  priority?: boolean;
  blurDataURL?: string;
  techStack?: string[];
  lures?: string[];
};

const ProjectInfoCard = ({ imageSrc, title, body, link, priority = false, blurDataURL, techStack, lures }: ProjectInfoCardProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={priority}
                    {...(blurDataURL ? { placeholder: "blur", blurDataURL } : {})}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    minHeight: { xs: "120px", sm: "140px" },
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 0.75,
                        mb: 1,
                    }}
                >
                    <Box sx={{ flexShrink: 0 }}>
                        {link ? (
                            <Link 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                sx={{ 
                                    textDecoration: "none", 
                                    "&:hover": { textDecoration: "underline" } 
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
                                        lineHeight: 1.2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    {title}
                                    <OpenInNew sx={{ fontSize: "inherit" }} />
                                </Typography>
                            </Link>
                        ) : (
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 700,
                                    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
                                    lineHeight: 1.2
                                }}
                            >
                                {title}
                            </Typography>
                        )}
                    </Box>
                    {(techStack?.length || lures?.length) && (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.75,
                            }}
                        >
                            {techStack?.map((item) => (
                                <Box
                                    key={item}
                                    sx={{
                                        px: 0.9,
                                        py: 0.35,
                                        borderRadius: 999,
                                        backgroundColor: "action.selected",
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    {item}
                                </Box>
                            ))}
                            {lures?.map((lure) => (
                                <Box
                                    key={lure}
                                    sx={{
                                        px: 0.9,
                                        py: 0.35,
                                        borderRadius: 999,
                                        backgroundColor: "action.selected",
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    {lure}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: "text.secondary",
                        fontSize: { xs: "0.875rem", sm: "1rem", md: "1rem" },
                        lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                        flex: 1
                    }}
                >
                    {body}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProjectInfoCard;