function needFormat(type: string | undefined){
    return type === 'array' || type === 'object';
};

export default needFormat;