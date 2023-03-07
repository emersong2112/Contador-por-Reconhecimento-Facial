export type Styles = {
  card: string;
  group: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
