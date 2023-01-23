import { useRouter } from "next/router";
import React from "react";
import { UrlObject } from "url";

interface Props {
  href: string | UrlObject;
  text: string;
}

export default function Button({ href, text }: Props) {
  const router = useRouter();
  return (
    <div>
      <button className="btn" onClick={() => router.push(href)}>
        {text}
      </button>
      <style jsx>{`
        .btn {
          background: darkmagenta;
          padding: 1em;
          border: none;
          color: #f2f2f2;
        }
      `}</style>
    </div>
  );
}
