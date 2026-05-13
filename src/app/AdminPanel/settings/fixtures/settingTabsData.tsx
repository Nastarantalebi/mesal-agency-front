import AddBedForm from "../components/bed/AddBedForm";
import BedsList from "../components/bed/BedsList";
import DefaultsForm from "../components/defaults/AddDefaults";
import AddFeaturesForm from "../components/features/AddFeaturesForm";
import FeaturesList from "../components/features/FeaturesList";
import News from "../components/news/NewsCard";
import NewsForm from "../components/news/NewsForm";
import UsersList from "../components/users/UsersList";


export const settingTabs = [
    {
      title: "ویژگی ها",
      component: (
        <div className="flex flex-col gap-10">
          <AddFeaturesForm asModal={false} buttonTitle="ثبت"  /> <FeaturesList />
        </div>
      ),
    },
    {
      title: "نوع تخت",
      component: (
        <div className="flex flex-col gap-10">
          <AddBedForm asModal={false} buttonTitle="ثبت" /> <BedsList />
        </div>
      ),
    },
    {
      title: "پیشفرض ها",
      component: (
        <div className="flex flex-col gap-10">
          <DefaultsForm/>
        </div>
      ),
    },
    {
      title: "لیست کاربران",
      component: (
        <div className="flex flex-col gap-10">
          <UsersList/>
        </div>
      ),
    },
    {
      title: "اخبار",
      component: (
        <div className="flex flex-col gap-10">
          <NewsForm/>
        </div>
      ),
    },
];