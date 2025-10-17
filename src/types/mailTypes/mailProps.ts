export interface ISendMailBaseProps {
    to: string | Array<string>;
    subject: string;
};

export interface ISendOtpMailProps extends ISendMailBaseProps {
    firstName: string;
    otp: string;
};
