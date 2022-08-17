module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@components": "./src/components/",
            "@hooks": "./src/hooks/",
            "@modals": "./src/modals/",
            "@navigation": "./src/navigation/",
            "@screens": "./src/screens/",
            "@utils": "./src/utils/",
          },
        },
      ],
    ],
  };
};
