import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT)
export default socket