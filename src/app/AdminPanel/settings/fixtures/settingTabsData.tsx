import AddBedForm from "../components/bed/AddBedForm";
import BedsList from "../components/bed/BedsList";
import DefaultsForm from "../components/defaults/AddDefaults";
import AddFeaturesForm from "../components/features/AddFeaturesForm";
import FeaturesList from "../components/features/FeaturesList";
import UsersList from "../components/users/UsersList";


export const settingTabs = [
    {
      title: "ویژگی های اقامتگاه",
      component: (
        <div className="flex flex-col gap-10">
          <AddFeaturesForm /> <FeaturesList />
        </div>
      ),
    },
    {
      title: "نوع تخت",
      component: (
        <div className="flex flex-col gap-10">
          <AddBedForm /> <BedsList />
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
];