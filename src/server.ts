import { http } from './http';
import './websocket/client';
http.listen(8080, () => console.log('Server run on port 8080 '));
