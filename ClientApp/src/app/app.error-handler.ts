import { environment } from './../environments/environment';
import { ErrorHandler, Injectable, Inject, Injector, isDevMode } from "@angular/core";
import * as Sentry from '@sentry/browser'
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor(@Inject(Injector) private readonly injector: Injector) {
        super();
        Sentry.init({
            dsn: "https://3076843e94a545bf8f775d54c84890fc@o554477.ingest.sentry.io/5683108",
            enabled: false
        });
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    handleError(error: any): void {

        Sentry.captureException(error.originalError || error);
        this.toastrService.error("An unexpected error has occurred", "Error", {
            onActivateTick: true
        });
        throw (error);
    }

}

