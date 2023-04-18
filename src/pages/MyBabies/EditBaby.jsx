import { useState, useEffect } from "react";
import { Container, Box, Typography, Button, TextField, Avatar, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DeleteBabyConfirmation from "../../components/DeleteBabyConfirmation/DeleteBabyConfirmation";


export default function EditBaby({user}) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [babyName, setBabyName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navgiate = useNavigate();
    const { babyId } = useParams();

    useEffect(() => {
        const fetchBaby = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/main/mybabies/edit/${babyId}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (response.ok) {
                    const responseBody = await response.json();
                    setBabyName(responseBody.name);
                    setDateOfBirth(dayjs(responseBody.dateOfBirth));
                    setPreviewImage(responseBody.imageURL);
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchBaby();
    },[babyId]);

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

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!babyName || !dateOfBirth) {
            alert("Please fill in all the fields.");
            return;
        }

        const babyData = {
            name: babyName,
            dateOfBirth: dateOfBirth.toISOString(),
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
                    throw new Error("Failed to upload image");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Failed to upload image.");
                return;
            }
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/mybabies/edit/${babyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ babyData })
            });

            if (response.ok) {
                const responseBody = await response.json();
                navgiate("/main/mybabies");
            } else {
                throw new Error("Failed to add baby");
            }
        } catch (err) {
            console.error(err);
        }
      }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/main/mybabies/delete/${babyId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ user_id: user._id })
            });

            if (response.ok) {
                const responseBody = await response.json();
                navgiate("/main/mybabies");
            } else {
                throw new Error("Failed to delete baby");
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
                <Typography variant="h4">Edit Your Baby</Typography>

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
                <DeleteBabyConfirmation babyName={babyName} handleDelete={handleDelete}/>
            </Box>
        </Container>
      );
}