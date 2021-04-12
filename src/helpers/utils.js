import dayjs from "dayjs";

export const listItems = (title, max, plus) => {
  let arrayList = [<option key={plus - 1}>Select a {title}</option>];
  for (let i = 0; i < max; i++) {
    arrayList.push(
      <option key={i + plus} value={i + plus}>
        {title === "day"
          ? dayjs()
              .date(i + 1)
              .format("DD")
          : title === "month"
          ? dayjs().month(i).format("MMMM")
          : dayjs()
              .year(i + 1970)
              .format("YYYY")}
      </option>
    );
  }
  return arrayList;
};
