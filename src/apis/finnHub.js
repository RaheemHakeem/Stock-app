import axios from "axios";
const Token = "cl3qe99r01qp2kg94io0cl3qe99r01qp2kg94iog";
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: Token
    }
})