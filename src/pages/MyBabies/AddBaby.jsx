import { useState, useEffect } from "react";
import { Container, Box, Typography, Button, TextField, Avatar, useMediaQuery, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function AddBaby({user, onBabyAdded}) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [babyName, setBabyName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [gender, setGender] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
      }, [user, navigate]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
          setImageFile(file);
        }
      };

      const handleGenderChange = (event) => {
        setGender(event.target.value);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!babyName || !dateOfBirth || !gender) {
            setError("Please fill in all the fields.");
            return;
        }

        if (dayjs(dateOfBirth).isAfter(dayjs())) {
            setError("DOB cannot be ahead of current date.")
            return;
        }

        const babyData = {
            name: babyName,
            dateOfBirth: dateOfBirth.toISOString(),
            gender: gender
        }

        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "xjmivey2");
    
                const response = await fetch("https://api.cloudinary.com/v1_1/dvaylqo9l/image/upload", {
                    method: "POST",
                    body: formData,
                });
    
                if (response.ok) {
                    const jsonResponse = await response.json();
                    babyData.imageURL = jsonResponse.secure_url;
                } else {
                    setError("Failed to upload image");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Failed to upload image.");
                return;
            }
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("/api/main/mybabies/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ user_id : user._id, babyData })
            });

            if (response.ok) {
                const responseBody = await response.json();
                const newBaby = responseBody.baby;
                onBabyAdded(newBaby);
                navigate("/main/mybabies");
            } else {
                setError("Failed to add baby");
            }
        } catch (err) {
            console.error(err);
        }
      }

    const AvatarLabel = styled('label')({
        cursor: 'pointer',
    });

    return (
        <Container maxWidth="xs" disableGutters>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "flex-start",
                minHeight: '100vh',
                paddingTop: theme => theme.spacing(4),
                }}
            >
                <Typography variant="h4">Add Your Baby</Typography>

                <AvatarLabel htmlFor="image-upload">
                    <Avatar
                    src={previewImage}
                    alt="Baby"
                    sx={{ width: 180, height: 180, marginTop: 3 }}
                    />
                </AvatarLabel>
                <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                />

                <TextField
                label="Baby's Name"
                variant="outlined"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                sx={{ marginTop: 3, width: isMobile? "210px" : "246px" }}
                />
                <FormControl sx={{ marginTop: 2, width: isMobile ? '210px' : '246px' }}>
                    <InputLabel htmlFor="select-gender">Gender</InputLabel>
                    <Select
                        labelId="select-gender"
                        id="simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                </FormControl>

                <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    disableFuture
                    onChange={(newValue) => setDateOfBirth(newValue)}
                    textField={
                        <TextField
                          sx={{ marginTop: 2, width: "100%" }}
                        />
                    }
                    sx={{ marginTop: 3}}
                 />

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    sx={{ marginTop: 2 }}
                >
                    Save
                </Button>
                <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    sx={{ marginTop: 5 }}
                    >
                    {error}
                </Typography>
            </Box>
        </Container>
      );
}