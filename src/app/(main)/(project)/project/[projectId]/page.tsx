"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const { projectId } = params;
  return (
    <div className="">
      Project Id : {projectId}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis odio
      quisquam recusandae id, obcaecati iusto repellendus adipisci tenetur
      explicabo eum doloremque, minima odit, molestiae omnis amet tempore quo
      voluptatum tempora. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Commodi, nisi? Unde, corrupti sint commodi modi delectus aperiam
      velit, quae minus ea reprehenderit nam perferendis. Nostrum quos aliquam
      reprehenderit molestias cum. Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Similique, repellat magni nobis cumque iusto veniam
      dolore voluptatibus nemo dicta, id ipsum quam unde temporibus, assumenda
      iure inventore velit laborum ducimus.
    </div>
  );
}
