type JsonLdPrimitive = string | number | boolean | null;

export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

type JsonLdProps = {
  data: { [key: string]: JsonLdValue | undefined };
};

export function JsonLd({ data }: JsonLdProps) {
  // 转义左尖括号，避免动态内容提前闭合 script 标签。
  const serializedData = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedData }}
    />
  );
}
