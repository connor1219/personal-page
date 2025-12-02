import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";

export type ProjectInfoCardProps = {
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
  priority?: boolean;
};

const ProjectInfoCard = ({ imageSrc, title, body, link, priority = false }: ProjectInfoCardProps) => {
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
                    boxShadow: (theme) => theme.shadows[1],
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
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
                                mb: 1, 
                                fontWeight: 700,
                                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
                                lineHeight: 1.2
                            }}
                        >
                            {title}
                        </Typography>
                    </Link>
                ) : (
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mb: 1, 
                            fontWeight: 700,
                            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
                            lineHeight: 1.2
                        }}
                    >
                        {title}
                    </Typography>
                )}
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