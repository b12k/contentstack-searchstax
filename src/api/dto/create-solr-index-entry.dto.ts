interface ICreateSolrIndexEntryDto {
  add: {
    doc: {
      id: string;
      title: string;
      url: string;
    };
  };
}
export class CreateSolrIndexEntryDto implements ICreateSolrIndexEntryDto {
  public add: ICreateSolrIndexEntryDto['add'];

  constructor(doc: ICreateSolrIndexEntryDto['add']['doc']) {
    this.add = { doc };
  }
}
