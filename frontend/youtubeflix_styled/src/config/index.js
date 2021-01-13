const URL_BACKEND_TEST = "http://imersao:3003";
const URL_BACKEND_PROD = "http://imersao:9092";

const isTest = window.location.hostname.includes('localhost');


const URL_BACKEND = isTest? URL_BACKEND_TEST : URL_BACKEND_PROD;

export default {
    URL_BACKEND,
};
