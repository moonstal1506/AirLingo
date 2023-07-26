#베이스 이미지를 도커 허브에서 가져옴
FROM node
#해당 어플의 소스코드들이 들어가게 됌
WORKDIR /usr/src/app
#소스코드가 바뀔때마다 종속성까지 다시 복사를 해주는 수고를 덜기위해 종속성 목록을 담고있는
#package.json 복사
COPY package*.json .
#종속성 다운
RUN npm install
#모든 소스코드들 WORKDIR로 복사
COPY . .
# VITE_OPEN 환경변수 설정
ENV VITE_OPEN=false
EXPOSE 5173
CMD ["npm","run","dev"]