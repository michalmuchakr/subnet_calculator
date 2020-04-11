import axios from "axios";
import "mock-api/routes/users";

export const fetchHeros = async appDsiapatch => {
    let res = await axios.get("/api/heroes");
    return res.data;
}