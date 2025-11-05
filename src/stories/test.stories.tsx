const meta = {
  title: "Color",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export function Color() {
  return (
    <div>
      <div className="flex h-10 w-[300px] items-center justify-center bg-red-500">
        Red
      </div>

      <div
        style={{
          backgroundColor: "orange",
          width: "300px",
          height: "40px",
        }}
      ></div>

      <div
        style={{
          backgroundColor: "yellow",
          width: "300px",
          height: "40px",
        }}
      ></div>

      <div
        style={{
          backgroundColor: "green",
          width: "300px",
          height: "40px",
        }}
      ></div>

      <div
        style={{
          backgroundColor: "blue",
          width: "300px",
          height: "40px",
        }}
      ></div>
    </div>
  );
}
