import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

export default function SvgComponent(props: any) {
  return (
    <>
      <div className=""></div>

      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className="location">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g filter="url(#filter0_d_635_1042)">
            <circle cx="12" cy="12" r="8" fill="white" />
          </g>
          <circle cx="12.0001" cy="12.0001" r="5.64706" fill="#FFC300" />
          <defs>
            <filter
              id="filter0_d_635_1042"
              x="0"
              y="0"
              width="24"
              height="24"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_635_1042"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_635_1042"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="fire">
        fire
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
        >
          <path
            d="M5.49992 12.5L14.4999 6V7.5C14.8333 8.16667 15.7 9.7 16.5 10.5C17.5 11.5 16.5 11.5 17.5 12.5C18.5 13.5 18.5 14 20.5 14H23.5H26C27.5 14 27.5 14 29 16C30.5 18 30.5 18 31 19.5C31.5 21 31 22 31 24C31 26 31 26.5 30.5 28.5C30 30.5 29.5 30.5 29 32C28.5 33.5 27 34 25 36C23 38 21.5 38 20.5 38C19.5 38 15.5 38.5 14.4999 38.5C13.4998 38.5 11 37 9.5 36C8 35 7.5 34.5 5.49992 33C3.49984 31.5 4.49992 31 2.99992 29.5C1.49992 28 1.99992 25.5 1.99992 23.5C1.99992 21.5 2.49992 19.5 2.99992 18C3.39992 16.8 4.83326 13.8333 5.49992 12.5Z"
            fill="#001D3D"
          />
          <g filter="url(#filter0_d_642_1538)">
            <path
              d="M4.25 24.375C4.25 26.2167 4.62188 27.9609 5.36563 29.6078C6.10938 31.2547 7.17188 32.6979 8.55313 33.9375C8.51771 33.7604 8.5 33.601 8.5 33.4594V32.9813C8.5 31.8479 8.7125 30.7854 9.1375 29.7938C9.5625 28.8021 10.1823 27.899 10.9969 27.0844L17 21.1875L23.0031 27.0844C23.8177 27.899 24.4375 28.8021 24.8625 29.7938C25.2875 30.7854 25.5 31.8479 25.5 32.9813V33.4594C25.5 33.601 25.4823 33.7604 25.4469 33.9375C26.8281 32.6979 27.8906 31.2547 28.6344 29.6078C29.3781 27.9609 29.75 26.2167 29.75 24.375C29.75 22.6042 29.4224 20.9307 28.7672 19.3547C28.112 17.7786 27.1646 16.3708 25.925 15.1313C25.2167 15.5917 24.4729 15.937 23.6938 16.1672C22.9146 16.3974 22.1177 16.5125 21.3031 16.5125C19.1073 16.5125 17.2036 15.7865 15.5922 14.3344C13.9807 12.8823 13.051 11.0938 12.8031 8.96875C11.4219 10.1375 10.2 11.3505 9.1375 12.6078C8.075 13.8651 7.18073 15.1401 6.45469 16.4328C5.72865 17.7255 5.17969 19.0448 4.80781 20.3906C4.43594 21.7365 4.25 23.0646 4.25 24.375ZM17 27.1375L13.9719 30.1125C13.5823 30.5021 13.2812 30.9448 13.0688 31.4406C12.8563 31.9365 12.75 32.45 12.75 32.9813C12.75 34.1146 13.1661 35.0885 13.9984 35.9031C14.8307 36.7177 15.8313 37.125 17 37.125C18.1688 37.125 19.1693 36.7177 20.0016 35.9031C20.8339 35.0885 21.25 34.1146 21.25 32.9813C21.25 32.4146 21.1438 31.8922 20.9313 31.4141C20.7188 30.9359 20.4177 30.5021 20.0281 30.1125L17 27.1375ZM17 1V8.0125C17 9.21667 17.4161 10.226 18.2484 11.0406C19.0807 11.8552 20.099 12.2625 21.3031 12.2625C21.9406 12.2625 22.5339 12.1297 23.0828 11.8641C23.6318 11.5984 24.1188 11.2 24.5438 10.6687L25.5 9.5C28.1208 10.9875 30.1927 13.0594 31.7156 15.7156C33.2385 18.3719 34 21.2583 34 24.375C34 29.1208 32.3531 33.1406 29.0594 36.4344C25.7656 39.7281 21.7458 41.375 17 41.375C12.2542 41.375 8.23438 39.7281 4.94063 36.4344C1.64688 33.1406 0 29.1208 0 24.375C0 19.8062 1.53177 15.4677 4.59531 11.3594C7.65885 7.25104 11.7937 3.79792 17 1ZM38.25 18C37.6479 18 37.1432 17.7964 36.7359 17.3891C36.3286 16.9818 36.125 16.4771 36.125 15.875C36.125 15.2729 36.3286 14.7682 36.7359 14.3609C37.1432 13.9536 37.6479 13.75 38.25 13.75C38.8521 13.75 39.3568 13.9536 39.7641 14.3609C40.1714 14.7682 40.375 15.2729 40.375 15.875C40.375 16.4771 40.1714 16.9818 39.7641 17.3891C39.3568 17.7964 38.8521 18 38.25 18ZM36.125 11.625V1H40.375V11.625H36.125Z"
              fill="#FFC300"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_642_1538"
              x="0"
              y="0"
              width="42.375"
              height="42.375"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.718012 0 0 0 0 0.244024 0 0 0 0 0.0408869 0 0 0 0.9 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_642_1538"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_642_1538"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="fire-radius">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="197"
          height="197"
          viewBox="0 0 197 197"
          fill="none"
        >
          <circle
            cx="98.5"
            cy="98.5"
            r="96.5"
            fill="#FFC300"
            fill-opacity="0.21"
            stroke="#FFC300"
            stroke-width="4"
          />
        </svg>
      </div>
      <div className="911-emergency">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="44"
          viewBox="0 0 49 44"
          fill="none"
        >
          <circle
            cx="23.5"
            cy="25.5"
            r="18.5"
            fill="#252525"
            fill-opacity="0.4"
          />
          <g filter="url(#filter0_d_642_1540)">
            <path
              d="M8.5 36.125V31.875H11.9L16.0969 17.9031C16.3802 16.9823 16.9026 16.2474 17.6641 15.6984C18.4255 15.1495 19.2667 14.875 20.1875 14.875H26.5625C27.4833 14.875 28.3245 15.1495 29.0859 15.6984C29.8474 16.2474 30.3698 16.9823 30.6531 17.9031L34.85 31.875H38.25V36.125H8.5ZM16.3625 31.875H30.3875L26.5625 19.125H20.1875L16.3625 31.875ZM21.25 10.625V0H25.5V10.625H21.25ZM33.8937 15.8844L30.8656 12.8563L38.4094 5.36563L41.3844 8.34062L33.8937 15.8844ZM36.125 25.5V21.25H46.75V25.5H36.125ZM12.8563 15.8844L5.36563 8.34062L8.34062 5.36563L15.8844 12.8563L12.8563 15.8844ZM0 25.5V21.25H10.625V25.5H0Z"
              fill="#001D3D"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_642_1540"
              x="0"
              y="0"
              width="48.75"
              height="38.125"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_642_1540"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_642_1540"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <View style={styles.container}>
        <Text>components page</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
