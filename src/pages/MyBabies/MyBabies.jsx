import { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Card, CardHeader, CardContent, Avatar, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";


export default function MyBabies({user}) {
    const [babies, setBabies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        const fetchBabies = async () => {
            try {
                const response = await fetch("/api/main/mybabies", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const fetchedBabies = await response.json();
                    setBabies(fetchedBabies);
                } else {
                    navigate("/");
                    throw new Error("Failed to fetch babies.");
                }
            } catch (error) {
                console.error("Error fetching babies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBabies();
    }, [user, navigate]);

    return (
        <Container maxWidth="sm" disableGutters>
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
                <Typography variant="h4">My Babies</Typography>
                {isLoading ? (
                    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', marginTop: 4 }}>
                        {babies.map((baby) => (
                            <Link to={`/main/mybabies/edit/${baby._id}`} key={baby._id} style={{ textDecoration: "none"}}>
                                <Card key={baby._id} sx={{ marginBottom: 2 }}>
                                    <CardHeader
                                        avatar={<Avatar src={baby?.imageURL} sx={{width:"100px", height:"100px"}} />}
                                        title={<Typography variant="h5">{baby.name}</Typography>}
                                        subheader={dayjs(baby.dateOfBirth).format("DD MMM YYYY")}
                                    />
                                </Card>
                            </Link>
                        ))}
                     </Box>
                )}

                <Button
                    component={Link}
                    to="/main/mybabies/add"
                    color="primary"
                    variant="contained"
                    sx={{ marginTop: 2 }}
                >
                    Add Baby
                </Button>
            </Box>
        </Container>
    );
}