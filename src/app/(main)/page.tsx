import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto text-center p-8">
        <h1 className="text-3xl font-bold underline">안녕하세요.</h1>
        <p className="mt-4 text-lg">저는 첫번째 페이지를 만들었습니다.</p>
        <Image
          src="/dog.png"
          alt="강아지 이미지"
          width={200}
          height={200}
          className="mt-6 text-center mx-auto rounded-lg shadow-lg 
hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
