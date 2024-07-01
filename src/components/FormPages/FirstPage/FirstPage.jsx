import { Box, Button } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const themes = [
    {
        "name": "Bags",
        "img_url": "data:image/jpeg;base64,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"
    },
    {
        "name": "Flex",
        "img_url": "data:image/jpeg;base64,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"
    },
    {
        "name": "Chic",
        "img_url": "data:image/jpeg;base64,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"
    }
]


const FirstPage = ({ activeStep, steps, handleBack, isStepOptional, handleNext, handleSkip }) => {
    const [themeName, setThemeName] = useState("")

    const handleClick = (name) => {
        setThemeName(name);
    }

    return (
        <>
            <Box sx={{ width: "100%", display: "flex",alignItems:"center", justifyContent: "space-between",flexDirection: { xs: 'column', md: 'row' },gap:"60px"}}>

                {
                    themes.map((theme) => (
                        <Card sx={{ width: "100%", maxWidth: 345, height: "400px" }} key={theme.name}>
                            <CardMedia
                                sx={{ height: 250 }}
                                image={theme?.img_url}
                                title="green iguana"
                            />

                            <CardActions sx={{ height: "35%" }}>
                                <Box sx={{ textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%", width: "100%" }}>
                                    <Typography variant="h5" sx={{ marginBottom: "15px", width: "100%", display: "flex", alignItems: "center", gap: "15px" }}>
                                        {theme?.name + " " + "theme"}  {theme?.name === "Bags" && <p style={{ fontSize: "15px" }}>recommended</p>}
                                    </Typography>
                                    <Button variant="outlined" sx={{ width: "80px" }} onClick={() => handleClick(theme?.name)}>{themeName === theme?.name ? <DoneOutlinedIcon /> : "Apply"}</Button>
                                </Box>
                            </CardActions>
                        </Card>
                    ))
                }
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                    </Button>
                )}

                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </>
    )
}
export default FirstPage