import NewsLetterForm from "../News-Letter-Form/NewsLetterForm";
import FooterNavList from "./Footer-Nav-List";
import Language from "./Language";
import PaymentMethods from "./Payment-Methods";
import Rights from "./Rights";
import SocialMedia from "./Social-Media";

export default function Footer() {
  return (
    <div className="lg:px-20 container space-y-10 md:px-10 py-10">
      <div className=" md:flex w-full space-y-5 justify-between">
        <div className="md:w-[70%]">
          <FooterNavList />
        </div>
        <div className="md:w-[30%]">
          <NewsLetterForm />
        </div>
      </div>
      <div className="md:flex items-center space-y-5 w-full justify-between ">
        <PaymentMethods />
        <SocialMedia />
      </div>
      <div className="md:flex items-center border-t space-y-5 pt-10 w-full justify-between">
        <Rights />
        <Language />
      </div>
    </div>
  );
}
