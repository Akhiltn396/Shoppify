import { Box, Button, Typography } from "@mui/material";
import Flow from "../../assets/flow.png"


const SecondPage = ({ activeStep, steps, handleBack, isStepOptional, handleNext, handleSkip }) => {

    return (
        <Box sx={{ height: "max-content", }}>
            <Box sx={{ display: "flex", height: "100%" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", paddingRight: "30px", textAlign: "left" }}>
                        Lets add a type,Category and Sub-Category
                    </Typography>
                    <Box sx={{fontWeight: "bold", display: "flex", flexDirection: "column", gap: "10px", width: "90%", paddingTop: "40px", }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                            Add a product type
                        </Typography>
                        <input type="text" placeholder="eg:- Books" style={{ padding: "5px 10px" }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                            Add a category (optional)
                        </Typography>
                        <input type="text" placeholder="eg:- Academic books" style={{ padding: "5px 10px" }} />

                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                            Add a sub-category (optional)
                        </Typography>
                        <input type="text" placeholder="eg:- Clinical books" style={{ padding: "5px 10px" }} />


                    </Box>
                </Box>
                <Box sx={{ flex: 1,display: { xs: 'none', md: 'block' }}}>
                    <img src={Flow} alt="" />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, flex: 1 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box />
              

                <Button variant="contained"
                    onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    )
}
export default SecondPage