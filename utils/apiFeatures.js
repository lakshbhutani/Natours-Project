class APIFeatures {
  constructor(query, requestQueryParams) {
    this.query = query;
    this.requestQueryParams = requestQueryParams;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.requestQueryParams };
    const excludedFields = ['sort', 'limit', 'duration', 'page', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);
    // 1B) Advance Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lte|gte|gt|lt)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.requestQueryParams.sort) {
      const sortQuery = this.requestQueryParams.sort.split(',').join(' ');
      this.query = this.query.sort(sortQuery);
      // sort('price ratingAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitingFields() {
    if (this.requestQueryParams.fields) {
      const fieldQuery = this.requestQueryParams.fields.split(',').join(' ');
      this.query = this.query.select(fieldQuery);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.requestQueryParams.page * 1 || 1;
    const limit = this.requestQueryParams.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=10, 1- 10, 11-20
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
