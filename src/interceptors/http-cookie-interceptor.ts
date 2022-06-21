import { HttpCookie } from '@caviajs/http-cookie';
import { Interceptor } from '@caviajs/http-router';

export const HttpCookieInterceptor: Interceptor = HttpCookie.setup();
