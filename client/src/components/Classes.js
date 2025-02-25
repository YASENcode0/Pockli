import { v4 as nextId } from "uuid";

class Card {
  // #title;
  // #amount;
  // #type;
  // #category;

  constructor(title, amount, type, category, id, date) {
    console.log(title, amount, type, category, date);

    this.id = id || nextId();
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = date || new Date();
  }
  // get type() {
  //   return this.type;
  // }
  CardCalculate(count, oldCard, isEdit) {
    if (isEdit) {
      if (
        oldCard?.oldAmount !== this.amount ||
        oldCard?.oldType !== this.type
      ) {
        this.ChangeAmountByType(count, this.type);
      }
    } else {
      this.ChangeAmountByType(count, this.type);
    }
  }

  ChangeAmountByType(count, type) {
    if (type) {
      count.current += this.amount;
    } else {
      count.current -= this.amount;
    }
    console.log(count)
  }

  DeleteCard(count) {
    console.log(count);
    console.log(this.type);
    this.ChangeAmountByType(count, !this.type);
  }
}

export default Card;
