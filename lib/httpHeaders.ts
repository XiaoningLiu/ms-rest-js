// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * A collection of HttpHeaders that can be sent with a HTTP request.
 */
function getHeaderKey(headerName: string) {
    return headerName.toLowerCase();
}

/**
 * An individual header within a HttpHeaders collection.
 */
export interface HttpHeader {
    /**
     * The name of the header.
     */
    name: string;

    /**
     * The value of the header.
     */
    value: string;
}

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A collection of HTTP header key/value pairs.
 */
export class HttpHeaders {
    private readonly _headersMap: { [headerKey: string]: HttpHeader };

    constructor(rawHeaders?: RawHttpHeaders) {
        this._headersMap = {};
        if (rawHeaders) {
            for (const headerName in rawHeaders) {
                this.set(headerName, rawHeaders[headerName]);
            }
        }
    }

    /**
     * Set a header in this collection with the provided name and value. The name is
     * case-insensitive.
     * @param headerName The name of the header to set. This value is case-insensitive.
     * @param headerValue The value of the header to set.
     */
    public set(headerName: string, headerValue: string | number): void {
        this._headersMap[getHeaderKey(headerName)] = { name: headerName, value: headerValue.toString() };
    }

    /**
     * Get the header value for the provided header name, or undefined if no header exists in this
     * collection with the provided name.
     * @param headerName The name of the header.
     */
    public get(headerName: string): string | undefined {
        const header: HttpHeader = this._headersMap[getHeaderKey(headerName)];
        return !header ? undefined : header.value;
    }

    /**
     * Get the headers that are contained in this collection.
     */
    public headers(): HttpHeader[] {
        const headers: HttpHeader[] = [];
        for (const headerKey in this._headersMap) {
            headers.push(this._headersMap[headerKey]);
        }
        return headers;
    }

    /**
     * Get the header names that are contained in this collection.
     */
    public headerNames(): string[] {
        const headerNames: string[] = [];
        const headers: HttpHeader[] = this.headers();
        for (let i = 0; i < headers.length; ++i) {
            headerNames.push(headers[i].name);
        }
        return headerNames;
    }

    /**
     * Get the header names that are contained in this collection.
     */
    public headerValues(): string[] {
        const headerValues: string[] = [];
        const headers: HttpHeader[] = this.headers();
        for (let i = 0; i < headers.length; ++i) {
            headerValues.push(headers[i].value);
        }
        return headerValues;
    }

    /**
     * Get the JSON object representation of this HTTP header collection.
     */
    public toJson(): RawHttpHeaders {
        const result: RawHttpHeaders = {};

        const headers: HttpHeader[] = this.headers();
        for (let i = 0; i < headers.length; ++i) {
            result[headers[i].name] = headers[i].value;
        }

        return result;
    }
}