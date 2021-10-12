declare module "bundle-text:*" {
  const value: string;
  export default value;
}

declare module "*.module.css" {
  const classNames: { [name: string]: string };
  export default classNames;
}
