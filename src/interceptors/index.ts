import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpRequestHeaderGeneratorInterceptor } from './http-request-header-generator.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestHeaderGeneratorInterceptor, multi: true },
];