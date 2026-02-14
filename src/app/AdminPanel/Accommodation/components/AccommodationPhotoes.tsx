import PhotoUploader from "@/components/form/PhotoUploader";
import usePostData from "@/services/usePostData";

const AccommodationPhotoes = ({ accommodationId }: { accommodationId: string }) => {
  const { mutate: uploadImage } = usePostData<FormData, any>({
    key: ["accommodation-image-upload", accommodationId],
    url: `admin/accommodations/${accommodationId}/images/`,
  });

  const onPick = (file: File) => {
    const fd = new FormData();
    fd.append("image", file); // if backend expects "file", change key
    uploadImage(fd);
  };

  return (
    <main className="w-full flex flex-row items-start gap-4 px-30 py-20">
      <PhotoUploader size={530} onPick={onPick} />
      <div className="grid grid-cols-2 gap-4 ">
        <PhotoUploader size={260} onPick={onPick}/>
        <PhotoUploader size={260} onPick={onPick}/>
        <PhotoUploader size={260} onPick={onPick}/>
        <PhotoUploader size={260} onPick={onPick}/>
      </div>
    </main>
  );
};

export default AccommodationPhotoes;

