import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Box, Button, Checkbox, Container, Divider, Grid, TextField, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import imageToBase64 from '../../helpers/imagetoBase64';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const productSchema = Yup.object().shape({
    title: Yup.string()
        .required('Product name required'),
    description: Yup.string()
        .required('Description required'),
    listPrice: Yup.number()
        .required('ListPrice Required'),
    discount: Yup.number()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Discount Percentage Required'),
    gst: Yup.number()
        .min(2, 'Too Short!')
        .required('GST Required'),
    shipCharges: Yup.number()
        .required('ShipCharges Required'),
    stockLevel: Yup.number()
        .required('StockLevel Required'),
});


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ThirdPage = ({ activeStep, steps, handleBack, isStepOptional, handleNext, handleSkip }) => {

    const [checkedSKU, setCheckedSKU] = useState(false);
    const [checkedHSN, setCheckedHSN] = useState(false);
    const [checkedGST, setCheckedGST] = useState(false);
    const [totalPrice, setTotalPrice] = useState(false);
    const [details, setDetails] = useState({
        title: "",
        description: ""

    });

    const [price, setPrice] = useState({
        netPrice: "",
        listPrice: "",
        discount: "",
        gst: "",
        shipCharges: "",
    })
    const [imgData, setImgData] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(value);
        setDetails(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    console.log(details?.product);
    const handlePriceChange = (e) => {
        const { name, value } = e.target;

        setPrice(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleClick = async (e) => {
        console.log(e.target.files);
        const imagePic = await imageToBase64(e.target.files[0]);
        setImgData(imagePic)
    }



    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const discountedPrice = price.listPrice - (price.listPrice * (price?.discount / 100));
        setPrice({ ...price, netPrice: discountedPrice });
    }, [price?.listPrice, price?.discount])

    useEffect(() => {
        const totalPrice = parseInt(price.netPrice) + parseInt(price.shipCharges);
        setTotalPrice(totalPrice)

    })
    console.log("details", details);
    return (
        <Box sx={{ height: "400px" }}>
            <Box sx={{ display: "flex", height: "100%" }}>

                {/* Left Window */}

                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        listPrice: '',
                        discount: '',
                        gst: '',
                        shipCharges: '',
                    }}
                    validationSchema={productSchema}

                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                        handleNext();
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form>

                            <Box sx={{ height: {xs:"max-content",md:"600px"}, flex: 1, overflowY: {xs:"hidden",md:"scroll"}, }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", paddingRight: "30px", textAlign: "left" }}>
                                    Lets add your first product
                                </Typography>
                                <Typography variant="h4" sx={{ paddingRight: "30px", paddingTop: "20px", textAlign: "left" }}>
                                    Basic Details
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: "bold", paddingTop: "20px", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                                    Product name
                                </Typography>

                                <InputField name="title" label="eg :- Books" validateOnChange={true} fullWidth="fullWidth" handleChange={handleChange} />

                                {errors.title && touched.title ? (
                                    <div style={{ color: "red", marginTop: "10px" }}>{errors.title}</div>
                                ) : null}
                                <Typography variant="h6" sx={{ fontWeight: "bold", paddingTop: "20px", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                                    Product description
                                </Typography>

                                <InputField name="description" label="Enter product description"
                                    validateOnChange={true} fullWidth="fullWidth" multiline="multiline"
                                    rows="4" handleChange={handleChange} />

                                {errors.description && touched.description ? (
                                    <div style={{ color: "red", marginTop: "10px" }}>{errors.description}</div>
                                ) : null}
                                <Typography variant="h6" sx={{ fontWeight: "bold", paddingTop: "20px", fontSize: "15px", paddingRight: "30px", textAlign: "left" }}>
                                    Add Image(s)
                                </Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ marginTop: "5px" }}
                                    onChange={(e) => handleClick(e)}
                                >
                                    Upload Image
                                    <VisuallyHiddenInput type="file" accept="image/jpeg,image/jpg, image/png"
                                    />
                                </Button>

                                <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
                                    <Checkbox onClick={() => setCheckedSKU(prev => !prev)} {...label} sx={{ p: 0, m: 0, border: "none" }} />
                                    <p>this product has an SKU code</p>
                                </Box>
                                {checkedSKU &&
                                    <TextField id="outlined-basic" label="SKU Code" variant="outlined" />
                                }
                                <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
                                    <Checkbox {...label} onClick={() => setCheckedHSN(prev => !prev)} sx={{ p: 0, m: 0, border: "none" }} />
                                    <p>this product has an HSN/SAC code</p>
                                </Box>
                                {
                                    checkedHSN &&
                                    <TextField id="outlined-basic" label="HSN/SAC code" variant="outlined" sx={{ marginBottom: "20px" }} />
                                }
                                <Divider orientation="horizontal" flexItem sx={{ bgcolor: "black", }} />

                                <Typography variant="h4" sx={{ paddingRight: "30px", paddingTop: "20px", textAlign: "left" }}>
                                    Pricing Details
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
                                    <Checkbox {...label} sx={{ p: 0, m: 0, border: "none" }} onClick={() => setCheckedGST(prev => !prev)} />
                                    <p>price inclusive of GST</p>
                                </Box>

                                <Container>
                                    <Grid container spacing={3}>
                                        {/* Left Column */}
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>Net Price</Typography>
                                                <InputField label={totalPrice ? totalPrice : + price?.netPrice}
                                                    variant="outlined"
                                                    name='netPrice' validateOnChange={true} handlePriceChange={handlePriceChange}
                                                    disabled={true} />
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>Discounted Percentage</Typography>


                                                <InputField
                                                    label="Enter Discounted Percentage"
                                                    variant="outlined"
                                                    name='discount' validateOnChange={true} handlePriceChange={handlePriceChange} />

                                                {errors.discount && touched.discount ? (
                                                    <div style={{ color: "red", marginTop: "10px" }}>{errors.discount}</div>
                                                ) : null}
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>Shipping Charges (if any)</Typography>
                                                {/* <TextField type="number"
                                                    fullWidth label="Enter Shipping Charges" variant="outlined" name='shipCharges' onChange={(e) => handlePriceChange(e)} /> */}

                                                <InputField
                                                    label="Enter Shipping Charges" variant="outlined" name='shipCharges' validateOnChange={true} handlePriceChange={handlePriceChange} />
                                                {errors.shipCharges && touched.shipCharges ? (
                                                    <div style={{ color: "red", marginTop: "10px" }}>{errors.shipCharges}</div>
                                                ) : null}
                                            </Box>
                                        </Grid>


                                        {/* Right Column */}
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>List Price</Typography>

                                            <InputField
                                                label="Enter List Price"
                                                variant="outlined"
                                                name='listPrice' validateOnChange={true} handlePriceChange={handlePriceChange} />

                                            {errors.listPrice && touched.listPrice ? (
                                                <div style={{ color: "red", marginTop: "10px" }}>{errors.listPrice}</div>
                                            ) : null}

                                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px", color: checkedGST ? "lightgray" : "" }}>GST Rate</Typography>

                                            <InputField
                                                disabled={checkedGST}
                                                label="Enter GST Rate"
                                                variant="outlined"
                                                name='gst' validateOnChange={true} handlePriceChange={handlePriceChange} />

                                            {errors.gst && touched.gst ? (
                                                <div style={{ color: "red", marginTop: "10px" }}>{errors.gst}</div>
                                            ) : null}

                                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "15px" }}>Stock Level</Typography>

                                            <InputField
                                                label="Enter Stock Level"
                                                variant="outlined"
                                                name='stockLevel' validateOnChange={true} handlePriceChange={handlePriceChange} />

                                            {errors.stockLevel && touched.stockLevel ? (
                                                <div style={{ color: "red", marginTop: "10px" }}>{errors.stockLevel}</div>
                                            ) : null}
                                        </Grid>

                                    </Grid>
                                </Container>


                                {/* Back and Next Buttons */}


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


                                    <Button type='submit' variant="contained"
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>

                {/* Right Window */}


                <Box sx={{ flex: 1, display: {xs:"none",md:"flex"}, alignItems: "center", justifyContent: "center", marginTop: "80px", }}>
                    <Card sx={{ minWidth: 345, maxWidth: 345, minHeight: 300, maxHeight: 500 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                image={imgData ? imgData : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAP1BMVEX///+hoaHu7u6bm5uYmJje3t719fWUlJSqqqrDw8Otra26urr8/PzR0dGenp7q6urKysrk5OTY2NiOjo6zs7MS6M5TAAAB10lEQVR4nO3Z6XKDIBiF4QCKGwU13P+1liTEuE4Clo/M9Dx/W6fvyDr2cgEAAAAAAAAAAAAAAAAAAIB48oyUYd21OmFMWFYzLWIx0SQsa0UveSRbpC37iX62+9Yy9c/LVNm1DQ97lKRMdoV2azRsEyAp6wW7EUFvjaKM1/cwpoP+EkXZwHyZDXmUosw831kX8ihFmbL6Mc8OdhCVrcwN5y1NtAcFVz3kKruUVhSs2b3VqEa4U39n1RKdAZIbvj9oo76vje0Pc59OvHhMwW1E5jLVar9uNwdE5jJ/OtzS1rMwb1mp2VS2XrlZyzh7lTHdf1GZFWxmtatRl5nZdOoXYe79LbYO2jLZVq9bWslWlrsaaZnq3FsSftBkrTdpy18mLLsPn2aPAV1OMs/kKRuq2aD1xU7Ys5q4bBq++W1yRbyucHRlqpnmlTbSbiaZT5sWCF3ZOJ9X3UGY89zVyMrMclc9DNNW0pZNl4q3nlONqqz5NMyllZRl497mdcjQlfGQLr/h0ZR9PMn8ePZUZU3QWDrFQFO2uVS8V3OKMi6qIlRlJUGZNBGfj41K/p22j/20bRJ/29Z1tLT/D7A63uG3oz+hyjMShgEAAAAAAAAAAAAAAAAAAJz3C267IKojD1V1AAAAAElFTkSuQmCC"}
                                alt="green iguana"
                            />
                            <CardContent sx={{ height: "100%", }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ height: "20px", backgroundColor: details.title === "" ? "lightgray" : "", width: details.title === "" ? "200px" : "" }}>
                                    {details.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    marginTop: "30px",
                                    height: "40px",
                                    backgroundColor: details.product === "" ? "lightgray" : "",
                                    textAlign: "justify",
                                    borderColor: "black", borderWidth: details.product === "" ? 0 : 2, borderStyle: 'solid', padding: "10px", textOverflow: "ellipsis", overflow: "hidden"
                                }}
                                >
                                    {details.description}
                                </Typography>
                                <Box sx={{ display: "flex", marginTop: "15px", gap: "20px" }}>
                                    <Typography sx={{ textDecoration: "line-through", bgcolor: price?.listPrice ? "" : "lightgray", width: "60px" }}>{price?.listPrice && "Rs." + price?.listPrice}</Typography>
                                    <Typography sx={{ bgcolor: price?.netPrice ? "" : "lightgray", color: price?.netPrice == 0 ? "lightgray" : "" }}>{totalPrice ? "Rs." + totalPrice : "Rs." + price?.netPrice}</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Box>


            </Box>


        </Box >
    )
}

function InputField(props) {
    const { className, name, validateOnChange = false, handleChange, handlePriceChange, ...rest } = props;

    // validateField
    return (
        <Field
            name={name}
            {...rest}
            render={({ field, form: { touched, errors, validateField } }) => {
                const error =
                    (validateOnChange || touched[name]) &&
                        typeof errors[name] === "string"
                        ? errors[name]
                        : null;

                const onChange = validateOnChange
                    ? e => {
                        if (validateOnChange) {
                            validateField(field.name);
                            console.log(field.name);
                            console.log(field.value);
                            handleChange ? handleChange(e) : handlePriceChange(e)

                        }
                        return field.onChange(e);
                    }
                    : field.onChange;

                return (
                    <div className={className}>
                        <TextField fullWidth={props.fullWidth ? props.fullWidth : ""} sx={{ marginTop: "5px" }} label={props?.label} multiline={props.multiline ? props.multiline : ""}
                            rows={props.rows ? props.rows : ""} disabled={props.disabled && props.disabled}
                            {...field} onChange={onChange}
                        />
                    </div>
                );
            }}
        />
    );
}
export default ThirdPage