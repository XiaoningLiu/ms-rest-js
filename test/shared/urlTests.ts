// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { URLTokenizer, URLToken, URLBuilder } from "../../lib/url";

describe("URLBuilder", () => {
  describe("setScheme()", () => {
    it(`to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("");
      assert.strictEqual(urlBuilder.getScheme(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to "http"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.toString(), "http://");
    });

    it(`to "http://"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http://");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.getHost(), undefined);
      assert.strictEqual(urlBuilder.toString(), "http://");
    });

    it(`to "http://www.example.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http://www.example.com");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.toString(), "http://www.example.com");
    });

    it(`to "http://www.exa mple.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http://www.exa mple.com");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.getHost(), "www.exa mple.com");
      assert.strictEqual(urlBuilder.toString(), "http://www.exa mple.com");
    });

    it(`from "http" to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setScheme("");
      assert.strictEqual(urlBuilder.getScheme(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from "http" to "https"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setScheme("https");
      assert.strictEqual(urlBuilder.getScheme(), "https");
      assert.strictEqual(urlBuilder.toString(), "https://");
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "A=B"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("A", "B");
      assert.strictEqual("http://www.example.com?A=B", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "App les=B"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("App les", "B");
      assert.strictEqual("http://www.example.com?App les=B", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "App+les=B"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("App+les", "B");
      assert.strictEqual("http://www.example.com?App+les=B", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "App%20les=B"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("App%20les", "B");
      assert.strictEqual("http://www.example.com?App%20les=B", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "Apples=Go od"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("Apples", "Go od");
      assert.strictEqual("http://www.example.com?Apples=Go od", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "Apples=Go+od"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("Apples", "Go+od");
      assert.strictEqual("http://www.example.com?Apples=Go+od", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "Apples=Go%20od"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("Apples", "Go%20od");
      assert.strictEqual("http://www.example.com?Apples=Go%20od", urlBuilder.toString());
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "A=B&C=D"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("A", "B");
      urlBuilder.setQueryParameter("C", "D");
      assert.strictEqual(urlBuilder.toString(), "http://www.example.com?A=B&C=D");
    });

    it(`to "http" and setHost() to "www.example.com" and setQueryParameter() to "A=B&C=D" and setPath() to "index.html"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("http");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setQueryParameter("A", "B");
      urlBuilder.setQueryParameter("C", "D");
      urlBuilder.setPath("index.html");
      assert.strictEqual(urlBuilder.toString(), "http://www.example.com/index.html?A=B&C=D");
    });

    it(`to "https" and setHost() to "www.example.com" and setPath() to "http://www.othersite.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("https");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setPath("http://www.othersite.com");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.getHost(), "www.othersite.com");
      assert.strictEqual(urlBuilder.getPath(), undefined);
      assert.strictEqual(urlBuilder.toString(), "http://www.othersite.com");
    });

    it(`to "https" and setHost() to "www.example.com" and setPath() to "mypath?thing=stuff"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("https");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setPath("mypath?thing=stuff");
      urlBuilder.setQueryParameter("otherthing", "otherstuff");
      assert.strictEqual(urlBuilder.getScheme(), "https");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.getPath(), "mypath");
      assert.strictEqual(urlBuilder.toString(), "https://www.example.com/mypath?thing=stuff&otherthing=otherstuff");
    });

    it(`to "https" and setHost() to "www.example.com" and setPath() to "http://www.othersite.com/mypath?thing=stuff" and setQueryParameter() to "otherthing=otherstuff"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setScheme("https");
      urlBuilder.setHost("www.example.com");
      urlBuilder.setPath("http://www.othersite.com/mypath?thing=stuff");
      urlBuilder.setQueryParameter("otherthing", "otherstuff");
      assert.strictEqual(urlBuilder.getScheme(), "http");
      assert.strictEqual(urlBuilder.getPath(), "/mypath");
      assert.strictEqual(urlBuilder.toString(), "http://www.othersite.com/mypath?thing=stuff&otherthing=otherstuff");
    });
  });

  describe("setHost()", () => {
    it(`to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("");
      assert.strictEqual(urlBuilder.getHost(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to "://www.example.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("://www.example.com");
      assert.strictEqual(urlBuilder.getScheme(), undefined);
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.toString(), "www.example.com");
    });

    it(`to "https://www.example.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("https://www.example.com");
      assert.strictEqual(urlBuilder.getScheme(), "https");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.toString(), "https://www.example.com");
    });

    it(`to "www.example.com:"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com:");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.getPort(), undefined);
      assert.strictEqual(urlBuilder.toString(), "www.example.com");
    });

    it(`to "www.example.com:1234"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com:1234");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.getPort(), "1234");
      assert.strictEqual(urlBuilder.toString(), "www.example.com:1234");
    });

    it(`to "www.example.com/"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.getPath(), "/");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/");
    });

    it(`to "www.example.com/index.html"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/index.html");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.getPath(), "/index.html");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/index.html");
    });

    it(`to "www.example.com?"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com?");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.toString(), "www.example.com");
    });

    it(`to "www.example.com?a=b"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com?a=b");
      assert.strictEqual(urlBuilder.getHost(), "www.example.com");
      assert.strictEqual(urlBuilder.toString(), "www.example.com?a=b");
    });

    it(`to "www.examp le.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.examp le.com");
      assert.strictEqual(urlBuilder.getHost(), "www.examp le.com");
      assert.strictEqual(urlBuilder.toString(), "www.examp le.com");
    });

    it(`from "www.example.com" to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com");
      urlBuilder.setHost("");
      assert.strictEqual(urlBuilder.getHost(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from "www.example.com" to "www.bing.com"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com");
      urlBuilder.setHost("www.bing.com");
      assert.strictEqual(urlBuilder.getHost(), "www.bing.com");
      assert.strictEqual(urlBuilder.toString(), "www.bing.com");
    });

    it(`to "www.example.com" and setPath() to "my/path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com");
      urlBuilder.setPath("my/path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
    });

    it(`to "www.example.com" and setPath() to "/my/path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com");
      urlBuilder.setPath("/my/path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
    });

    it(`to "www.example.com/" and setPath() to "my/path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      urlBuilder.setPath("my/path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
    });

    it(`to "www.example.com/" and setPath() to "/my/path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      urlBuilder.setPath("/my/path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my/path");
    });

    it(`to "www.example.com" and setPath() to "my path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      urlBuilder.setPath("my path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my path");
    });

    it(`to "www.example.com" and setPath() to "my+path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      urlBuilder.setPath("my+path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my+path");
    });

    it(`to "www.example.com" and setPath() to "my%20path"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setHost("www.example.com/");
      urlBuilder.setPath("my%20path");
      assert.strictEqual(urlBuilder.toString(), "www.example.com/my%20path");
    });
  });

  describe("setPort()", () => {
    it(`to undefined`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(undefined);
      assert.strictEqual(urlBuilder.getPort(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("");
      assert.strictEqual(urlBuilder.getPort(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to 50`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(50);
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.toString(), ":50");
    });

    it(`to "50"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("50");
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.toString(), ":50");
    });

    it(`to "50/"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("50/");
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.getPath(), "/");
      assert.strictEqual(urlBuilder.toString(), ":50/");
    });

    it(`to "50/index.html"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("50/index.html");
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.getPath(), "/index.html");
      assert.strictEqual(urlBuilder.toString(), ":50/index.html");
    });

    it(`to "50?"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("50?");
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.toString(), ":50");
    });

    it(`to "50?a=b&c=d"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort("50?a=b&c=d");
      assert.strictEqual(urlBuilder.getPort(), "50");
      assert.strictEqual(urlBuilder.toString(), ":50?a=b&c=d");
    });

    it(`from 8080 to undefined`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(8080);
      urlBuilder.setPort(undefined);
      assert.strictEqual(urlBuilder.getPort(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from 8080 to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(8080);
      urlBuilder.setPort("");
      assert.strictEqual(urlBuilder.getPort(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from 8080 to 123`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(8080);
      urlBuilder.setPort(123);
      assert.strictEqual(urlBuilder.getPort(), "123");
      assert.strictEqual(urlBuilder.toString(), ":123");
    });

    it(`from 8080 to "123"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPort(8080);
      urlBuilder.setPort("123");
      assert.strictEqual(urlBuilder.getPort(), "123");
      assert.strictEqual(urlBuilder.toString(), ":123");
    });
  });

  describe("setPath()", () => {
    it(`to undefined`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath(undefined);
      assert.strictEqual(urlBuilder.getPath(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("");
      assert.strictEqual(urlBuilder.getPath(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to "/"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("/");
      assert.strictEqual(urlBuilder.getPath(), "/");
      assert.strictEqual(urlBuilder.toString(), "/");
    });

    it(`to "test/path.html"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("test/path.html");
      assert.strictEqual(urlBuilder.getPath(), "test/path.html");
      assert.strictEqual(urlBuilder.toString(), "/test/path.html");
    });

    it(`from "/" to undefined`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("/");
      urlBuilder.setPath(undefined);
      assert.strictEqual(urlBuilder.getPath(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from "/" to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("/");
      urlBuilder.setPath("");
      assert.strictEqual(urlBuilder.getPath(), undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`from "/" to "/"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("/");
      urlBuilder.setPath("/");
      assert.strictEqual(urlBuilder.getPath(), "/");
      assert.strictEqual(urlBuilder.toString(), "/");
    });

    it(`from "/" to "test/path.html"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setPath("/");
      urlBuilder.setPath("test/path.html");
      assert.strictEqual(urlBuilder.getPath(), "test/path.html");
      assert.strictEqual(urlBuilder.toString(), "/test/path.html");
    });
  });

  describe("setQuery()", () => {
    it(`to undefined`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setQuery(undefined);
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to ""`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setQuery("");
      assert.strictEqual(urlBuilder.toString(), "");
    });

    it(`to "?"`, () => {
      const urlBuilder = new URLBuilder();
      urlBuilder.setQuery("?");
      assert.strictEqual(urlBuilder.toString(), "");
    });
  });

  describe("parse()", () => {
    it(`with ""`, () => {
      assert.strictEqual(URLBuilder.parse("").toString(), "");
    });

    it(`with "www.bing.com"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com").toString(), "www.bing.com");
    });

    it(`with "www.bing.com:8080"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:8080").toString(), "www.bing.com:8080");
    });

    it(`with "ftp://www.bing.com:8080"`, () => {
      assert.strictEqual(URLBuilder.parse("ftp://www.bing.com:8080").toString(), "ftp://www.bing.com:8080");
    });

    it(`with "www.bing.com/my/path"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com/my/path").toString(), "www.bing.com/my/path");
    });

    it(`with "ftp://www.bing.com/my/path"`, () => {
      assert.strictEqual(URLBuilder.parse("ftp://www.bing.com/my/path").toString(), "ftp://www.bing.com/my/path");
    });

    it(`with "www.bing.com:1234/my/path"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:1234/my/path").toString(), "www.bing.com:1234/my/path");
    });

    it(`with "ftp://www.bing.com:1234/my/path"`, () => {
      assert.strictEqual(URLBuilder.parse("ftp://www.bing.com:1234/my/path").toString(), "ftp://www.bing.com:1234/my/path");
    });

    it(`with "www.bing.com?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com?a=1").toString(), "www.bing.com?a=1");
    });

    it(`with "https://www.bing.com?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com?a=1").toString(), "https://www.bing.com?a=1");
    });

    it(`with "www.bing.com:123?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:123?a=1").toString(), "www.bing.com:123?a=1");
    });

    it(`with "https://www.bing.com:987?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com:987?a=1").toString(), "https://www.bing.com:987?a=1");
    });

    it(`with "www.bing.com/folder/index.html?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com/folder/index.html?a=1").toString(), "www.bing.com/folder/index.html?a=1");
    });

    it(`with "https://www.bing.com/image.gif?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com/image.gif?a=1").toString(), "https://www.bing.com/image.gif?a=1");
    });

    it(`with "www.bing.com:123/index.html?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:123/index.html?a=1").toString(), "www.bing.com:123/index.html?a=1");
    });

    it(`with "https://www.bing.com:987/my/path/again?a=1"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com:987/my/path/again?a=1").toString(), "https://www.bing.com:987/my/path/again?a=1");
    });

    it(`with "www.bing.com?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com?a=1&b=2").toString(), "www.bing.com?a=1&b=2");
    });

    it(`with "https://www.bing.com?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com?a=1&b=2").toString(), "https://www.bing.com?a=1&b=2");
    });

    it(`with "www.bing.com:123?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:123?a=1&b=2").toString(), "www.bing.com:123?a=1&b=2");
    });

    it(`with "https://www.bing.com:987?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com:987?a=1&b=2").toString(), "https://www.bing.com:987?a=1&b=2");
    });

    it(`with "www.bing.com/folder/index.html?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com/folder/index.html?a=1&b=2").toString(), "www.bing.com/folder/index.html?a=1&b=2");
    });

    it(`with "https://www.bing.com/image.gif?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com/image.gif?a=1&b=2").toString(), "https://www.bing.com/image.gif?a=1&b=2");
    });

    it(`with "www.bing.com:123/index.html?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("www.bing.com:123/index.html?a=1&b=2").toString(), "www.bing.com:123/index.html?a=1&b=2");
    });

    it(`with "https://www.bing.com:987/my/path/again?a=1&b=2"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com:987/my/path/again?a=1&b=2").toString(), "https://www.bing.com:987/my/path/again?a=1&b=2");
    });

    it(`with "https://www.bing.com/my:/path"`, () => {
      assert.strictEqual(URLBuilder.parse("https://www.bing.com/my:/path").toString(), "https://www.bing.com/my:/path");
    });
  });
});

describe("URLTokenizer", () => {
  it("should not have a current token when first created", () => {
    const tokenizer = new URLTokenizer("http://www.bing.com");
    assert.strictEqual(tokenizer.current(), undefined);
  });

  describe("next()", () => {
    function nextTest(text: string, expectedURLTokens: URLToken[]): void {
      const tokenizer = new URLTokenizer(text);
      if (expectedURLTokens) {
        for (let i = 0; i < expectedURLTokens.length; ++i) {
          assert.strictEqual(tokenizer.next(), true, `Expected to find ${expectedURLTokens.length} URLTokens, but found ${i} instead.`);
          assert.deepEqual(tokenizer.current(), expectedURLTokens[i], `Expected the ${i + 1} URLToken to be ${JSON.stringify(expectedURLTokens[i])}, but found ${JSON.stringify(tokenizer.current())} instead.`);
        }
      }
      assert.strictEqual(tokenizer.next(), false, `Only expected to find ${(expectedURLTokens ? expectedURLTokens.length : 0)} URL token(s).`);
      assert.strictEqual(tokenizer.current(), undefined, `After reading all of the URLTokens, expected the current value to be undefined.`);
    }

    it(`with ""`, () => {
      nextTest("", []);
    });

    it(`with "http"`, () => {
      nextTest("http", [
        URLToken.host("http")
      ]);
    });

    it(`with "http:"`, () => {
      nextTest("http:", [
        URLToken.host("http"),
        URLToken.port("")
      ]);
    });

    it(`with "http:/"`, () => {
      nextTest("http:/", [
        URLToken.host("http"),
        URLToken.port(""),
        URLToken.path("/")
      ]);
    });

    it(`with "http://"`, () => {
      nextTest("http://", [
        URLToken.scheme("http"),
        URLToken.host("")
      ]);
    });

    it(`with "https://www.example.com"`, () => {
      nextTest("https://www.example.com", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com")
      ]);
    });

    it(`with "https://www.example.com:"`, () => {
      nextTest("https://www.example.com:", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.port("")
      ]);
    });

    it(`with "https://www.example.com:8080"`, () => {
      nextTest("https://www.example.com:8080", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.port("8080")
      ]);
    });

    it(`with "ftp://www.bing.com:123/"`, () => {
      nextTest("ftp://www.bing.com:123/", [
        URLToken.scheme("ftp"),
        URLToken.host("www.bing.com"),
        URLToken.port("123"),
        URLToken.path("/")
      ]);
    });

    it(`with "ftp://www.bing.com:123/a/b/c.txt"`, () => {
      nextTest("ftp://www.bing.com:123/a/b/c.txt", [
        URLToken.scheme("ftp"),
        URLToken.host("www.bing.com"),
        URLToken.port("123"),
        URLToken.path("/a/b/c.txt")
      ]);
    });

    it(`with "ftp://www.bing.com:123?"`, () => {
      nextTest("ftp://www.bing.com:123?", [
        URLToken.scheme("ftp"),
        URLToken.host("www.bing.com"),
        URLToken.port("123"),
        URLToken.query("")
      ]);
    });

    it(`with "ftp://www.bing.com:123?a=b&c=d"`, () => {
      nextTest("ftp://www.bing.com:123?a=b&c=d", [
        URLToken.scheme("ftp"),
        URLToken.host("www.bing.com"),
        URLToken.port("123"),
        URLToken.query("a=b&c=d")
      ]);
    });

    it(`with "https://www.example.com/"`, () => {
      nextTest("https://www.example.com/", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.path("/")
      ]);
    });

    it(`with "https://www.example.com/index.html"`, () => {
      nextTest("https://www.example.com/index.html", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.path("/index.html")
      ]);
    });

    it(`with "https://www.example.com/index.html?"`, () => {
      nextTest("https://www.example.com/index.html?", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.path("/index.html"),
        URLToken.query("")
      ]);
    });

    it(`with "https://www.example.com/index.html?"`, () => {
      nextTest("https://www.example.com/index.html?", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.path("/index.html"),
        URLToken.query("")
      ]);
    });

    it(`with "https://www.example.com/index.html?alpha=beta"`, () => {
      nextTest("https://www.example.com/index.html?alpha=beta", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.path("/index.html"),
        URLToken.query("alpha=beta")
      ]);
    });

    it(`with "https://www.example.com?"`, () => {
      nextTest("https://www.example.com?", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.query("")
      ]);
    });

    it(`with "https://www.example.com?a=b"`, () => {
      nextTest("https://www.example.com?a=b", [
        URLToken.scheme("https"),
        URLToken.host("www.example.com"),
        URLToken.query("a=b")
      ]);
    });

    it(`with "www.test.com/"`, () => {
      nextTest("www.test.com/", [
        URLToken.host("www.test.com"),
        URLToken.path("/")
      ]);
    });

    it(`with "www.test.com?"`, () => {
      nextTest("www.test.com?", [
        URLToken.host("www.test.com"),
        URLToken.query("")
      ]);
    });

    it(`with "folder/index.html"`, () => {
      nextTest("folder/index.html", [
        URLToken.host("folder"),
        URLToken.path("/index.html")
      ]);
    });

    it(`with "/folder/index.html"`, () => {
      nextTest("/folder/index.html", [
        URLToken.host(""),
        URLToken.path("/folder/index.html")
      ]);
    });
  });
});