[{
    "index": "/index.html",
    "assetGroups": [{
        "name": "flipzon-angular",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/index.html"
        ],
        "versionedFiles": [
          "/*.bundle.css",
          "/*.bundle.js",
          "/*.chunk.js"
        ]
      }
    }, {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**"
        ]
      }
    }],
    "dataGroups": [{
      "name": "api-freshness",
      "urls": [
        "/new"
      ],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1h",
        "timeout": "10s",
        "strategy": "freshness"
      }
    }, {
      "name": "api-performance",
      "urls": [
        "/"
      ],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "1d",
        "strategy": "performance"
      }
    }]
  }]