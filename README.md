# Proxy of Weekday Counter for Korea

한국 공휴일 정보를 공공데이터의 Open API로부터 받아옵니다.

## Example

실행하기 전에 SERVICE_KEY를 설정해야합니다.

```shell
$ export SERVICE_KEY=${open API의 SERVICE KEY}
$ curl http://localhost:5000/holidays/2021/10
{"holidays":[{"year":2021,"month":10,"day":3},{"year":2021,"month":10,"day":4},{"year":2021,"month":10,"day":9},{"year":2021,"month":10,"day":11}]}
```
