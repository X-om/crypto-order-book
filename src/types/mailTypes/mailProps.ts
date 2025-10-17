interface ISendMailBaseProps {
    to: string | Array<string>;
    subject: string;
};

interface ISendOtpMailProps extends ISendMailBaseProps {
    firstName: string;
    otp: string;
};
