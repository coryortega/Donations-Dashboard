function sumAccountAmounts(arrayOfObjects, startTime = null, endTime = null) {
  let totalSum = 0;
  arrayOfObjects.forEach((obj) => {
    const giftDate = obj["Gift Date"];
    const [, , year] = giftDate.split("/");
    const fullYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);

    if (startTime && endTime) {
      if (fullYear >= startTime && fullYear <= endTime) {
        totalSum += Number(obj["Account Amount"]);
      }
    } else {
      totalSum += Number(obj["Account Amount"]);
    }
  });
  return totalSum;
}

const getNumberOfDonations = (donations, startTime = null, endTime = null) => {
  let number = 0;

  donations.forEach((obj) => {
    const giftDate = obj["Gift Date"];
    const [, , year] = giftDate.split("/");
    const lastYear = new Date().getFullYear() - 1;
    const fullYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);

    if (startTime && endTime) {
      if (fullYear >= startTime && fullYear <= endTime) {
        number = number + 1;
      }
    } else {
      if (fullYear <= lastYear) {
        number = number + 1;
      }
    }
  });

  return number;
};

const yearsDonatedByDonor = (donations, startTime = null, endTime = null) => {
  const yearDonorMap = {};
  const amountDonorDonated = {};

  donations.forEach((donation) => {
    const giftDate = donation["Gift Date"];
    const donorId = donation["Constituent ID"];
    const [, , year] = giftDate.split("/");
    const giftYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);

    if (startTime && endTime) {
      if (giftYear >= startTime && giftYear <= endTime) {
        if (!(giftYear in yearDonorMap)) {
          yearDonorMap[giftYear] = [];
        }

        if (!yearDonorMap[giftYear].includes(donorId)) {
          yearDonorMap[giftYear] = [...yearDonorMap[giftYear], donorId];
        }
      }
    } else {
      if (!(giftYear in yearDonorMap)) {
        yearDonorMap[giftYear] = [];
      }

      if (!yearDonorMap[giftYear].includes(donorId)) {
        yearDonorMap[giftYear] = [...yearDonorMap[giftYear], donorId];
      }
    }
  });

  for (const year in yearDonorMap) {
    const donors = yearDonorMap[year];
    for (const id of donors) {
      if (id in amountDonorDonated) {
        amountDonorDonated[id]++;
      } else {
        amountDonorDonated[id] = 1;
      }
    }
  }

  const sum = Object.values(amountDonorDonated).reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return sum;
};

const sumUniqueDonorsPerYear = (
  donations,
  startTime = null,
  endTime = null
) => {
  const yearsObj = {};
  let result = 0;

  donations.forEach((donation) => {
    const donorId = donation["Constituent ID"];
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

    if (!(fullYear in yearsObj)) {
      yearsObj[fullYear] = new Set();
    }
    yearsObj[fullYear].add(donorId);
  });

  for (const year in yearsObj) {
    if (startTime && endTime) {
      if (year >= startTime && year <= endTime) {
        result += yearsObj[year].size;
      }
    } else {
      result += yearsObj[year].size;
    }
  }

  return result;
};

export const averageGift = (data, startTime = null, endTime = null) => {
  const total = sumAccountAmounts(data, startTime, endTime);
  const numberOfDonations =
    startTime && endTime
      ? getNumberOfDonations(data, startTime, endTime)
      : data.length;
  return total / numberOfDonations;
};

export const averageDonorGift = (data, startTime = null, endTime) => {
  let total, uniqueDonors;
  if (startTime && endTime) {
    total = sumAccountAmounts(data, startTime, endTime);
    uniqueDonors = sumUniqueDonorsPerYear(data, startTime, endTime);
    return Math.round((total / uniqueDonors) * 100) / 100;
  }

  total = sumAccountAmounts(data);
  uniqueDonors = sumUniqueDonorsPerYear(data);
  return Math.round((total / uniqueDonors) * 100) / 100;
};

export const formatDollar = (number) => {
  // Check if the input is a valid number
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid input";
  }

  // Round to two decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Convert to string with commas for thousands separator
  const formattedNumber = roundedNumber.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formattedNumber;
};

const calculateTotalYears = (arrayOfObjects) => {
  // Initialize variables for min and max dates
  let minDate = new Date(arrayOfObjects[0]["Gift Date"]);
  let maxDate = new Date(arrayOfObjects[0]["Gift Date"]);

  // Loop through each object in the array to find min and max dates
  arrayOfObjects.forEach((obj) => {
    const currentDate = new Date(obj["Gift Date"]);
    if (currentDate < minDate) {
      minDate = currentDate;
    }
    if (currentDate > maxDate) {
      maxDate = currentDate;
    }
  });

  // Calculate difference in years between max and min dates
  const timeDiff = maxDate.getTime() - minDate.getTime();
  const totalYears = timeDiff / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years

  // Round to whole number
  return Math.round(totalYears);
};

export const countUniqueDonors = (
  arrayOfObjects,
  startTime = null,
  endTime = null
) => {
  // Use a Set to store unique Constituent IDs
  const uniqueConstituents = new Set();

  // Iterate over each object in the array
  arrayOfObjects.forEach((obj) => {
    const giftDate = new Date(obj["Gift Date"]).getFullYear();
    const lastYear = new Date().getFullYear() - 1;
    // Check if startTime and endTime are provided and filter by time range
    if (startTime && endTime && "Gift Date" in obj) {
      if (giftDate >= startTime && giftDate <= endTime) {
        uniqueConstituents.add(obj["Constituent ID"]);
      }
    } else {
      // Add all constituents if no time range is provided
      if ("Constituent ID" in obj && giftDate <= lastYear) {
        uniqueConstituents.add(obj["Constituent ID"]);
      }
    }
  });
  // Return the size of the Set, which represents the number of unique constituents
  return uniqueConstituents.size;
};

export const averageDonorLifespan = (
  donations,
  startTime = null,
  endTime = null
) => {
  let uniqueDonors, sum;
  if (startTime && endTime) {
    uniqueDonors = countUniqueDonors(donations, startTime, endTime);
    sum = yearsDonatedByDonor(donations, startTime, endTime);
  } else {
    uniqueDonors = countUniqueDonors(donations);
    sum = yearsDonatedByDonor(donations);
  }
  return Math.round(sum / uniqueDonors);
};

export const averageDonorFrequency = (
  donations,
  startTime = null,
  endTime = null
) => {
  const yearsObj = {};

  donations.forEach((donation) => {
    const giftDate = donation["Gift Date"];
    const donorId = donation["Constituent ID"];
    const [, , year] = giftDate.split("/");
    const giftYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);

    if (endTime && startTime) {
      if (giftYear >= startTime && giftYear <= endTime) {
        if (!(giftYear in yearsObj)) {
          yearsObj[giftYear] = {
            numberOfDonations: 0,
            uniqueDonors: new Set(),
          };
        }
        yearsObj[giftYear].numberOfDonations++;
        yearsObj[giftYear].uniqueDonors.add(donorId);
      }
    } else {
      if (!(giftYear in yearsObj)) {
        yearsObj[giftYear] = { numberOfDonations: 0, uniqueDonors: new Set() };
      }
      yearsObj[giftYear].numberOfDonations++;
      yearsObj[giftYear].uniqueDonors.add(donorId);
    }
  });

  let sumFrequency = 0;
  for (const year in yearsObj) {
    const result =
      yearsObj[year].numberOfDonations / yearsObj[year].uniqueDonors.size;
    sumFrequency = sumFrequency + result;
  }

  return Math.round((sumFrequency / Object.keys(yearsObj).length) * 100) / 100;

  // old way, keeping just in case
  // const numberOfDonations = getNumberOfDonations(donations, startTime, endTime);
  // const uniqueDonors = countUniqueDonors(donations, startTime, endTime);
  // return Math.round(numberOfDonations / uniqueDonors);
};

export const getUniqueYears = (donations) => {
  const yearsSet = new Set();

  // Extract and process each "Gift Date" to get the year
  donations.forEach((obj) => {
    if ("Gift Date" in obj) {
      const giftDate = obj["Gift Date"];
      const [, , year] = giftDate.split("/");

      // Convert two-digit year to full year format (assuming it's 1900-1999)
      const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

      // Add the full year to the Set
      yearsSet.add(fullYear);
    }
  });

  // Convert Set to array, sort it, and return
  const sortedYears = Array.from(yearsSet).sort();
  return sortedYears;
};

export const countGiftsByYear = (donations) => {
  const yearCount = {};

  // Iterate over each object in the array
  donations.forEach((obj) => {
    const giftDate = obj["Gift Date"];
    const [, , year] = giftDate.split("/");

    // Convert two-digit year to full year format (assuming it's 1900-1999)
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

    // Count occurrences of each year
    if (yearCount[fullYear]) {
      yearCount[fullYear]++;
    } else {
      yearCount[fullYear] = 1;
    }
  });

  return yearCount;
};

export const accumulateAmountByYear = (donations) => {
  const amountByYear = {};

  // Iterate over each object in the array
  donations.forEach((obj) => {
    if ("Gift Date" in obj && "Account Amount" in obj) {
      const giftDate = obj["Gift Date"];
      const [, , year] = giftDate.split("/");

      // Convert two-digit year to full year format (assuming it's 1900-1999)
      const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

      // Accumulate the Account Amount for each year
      if (amountByYear[fullYear]) {
        amountByYear[fullYear] += parseFloat(obj["Account Amount"]);
      } else {
        amountByYear[fullYear] = parseFloat(obj["Account Amount"]);
      }
    }
  });

  return amountByYear;
};

/*
  [
    {
      month: "Jan",
      2018: 1412,
      2019: 1232,
      2020
    }
  ]
*/
function mapYearAbbreviationToFullYear(abbreviation) {
  if (abbreviation >= 0 && abbreviation <= 99) {
    // Get current year for reference
    const currentYear = new Date().getFullYear();

    // Determine the threshold for deciding the century
    const threshold = currentYear % 100;

    // Map the abbreviation to a full year
    if (abbreviation <= threshold) {
      return 2000 + abbreviation;
    } else {
      return 1900 + abbreviation;
    }
  } else {
    throw new Error(
      "Invalid year abbreviation. Please provide a number between 0 and 99."
    );
  }
}

const monthMappings = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const revenuByMonth = (donations, previousYears = null) => {
  const monthObject = {};

  donations.forEach((donation) => {
    if ("Gift Date" in donation && "Account Amount" in donation) {
      const [month, , abbreviatedYear] = donation["Gift Date"].split("/");
      const amount = donation["Account Amount"];
      const year = mapYearAbbreviationToFullYear(Number(abbreviatedYear));
      const monthAbbreviation = monthMappings[month];

      if (monthAbbreviation in monthObject) {
        if (year in monthObject[monthAbbreviation]) {
          monthObject[monthAbbreviation][year] =
            monthObject[monthAbbreviation][year] + Number(amount);
        } else {
          monthObject[monthAbbreviation][year] = Number(amount);
        }
      } else {
        monthObject[monthAbbreviation] = {};
        monthObject[monthAbbreviation][year] = Number(amount);
      }
    }
  });

  const flattenedObjs = [];
  for (const month in monthObject) {
    if (month !== "undefined") {
      flattenedObjs.push({
        month,
        ...monthObject[month],
      });
    }
  }
  const sortedMonths = flattenedObjs.sort(function (a, b) {
    return (
      Object.values(monthMappings).indexOf(a.month) -
      Object.values(monthMappings).indexOf(b.month)
    );
  });

  return sortedMonths;
};

const isBetween = (n, start, stop) => n >= start && n <= stop;

export const donorsBySegment = (donations, startTime, endTime) => {
  const segments = { 0: 0, 50: 0, 150: 0, 250: 0, 500: 0, 1000: 0 };
  const avgGiftPerDonor = averageGiftPerDonor(donations, startTime, endTime);

  for (const donorId in avgGiftPerDonor) {
    const { total, timesDonated } = avgGiftPerDonor[donorId];
    const amount = total / timesDonated;
    switch (true) {
      case isBetween(amount, 0, 49):
        segments[0] = segments[0] += 1;
        break;
      case isBetween(amount, 50, 149):
        segments[50] = segments[50] += 1;
        break;
      case isBetween(amount, 150, 249):
        segments[150] = segments[150] += 1;
        break;
      case isBetween(amount, 250, 499):
        segments[250] = segments[250] += 1;
        break;
      case isBetween(amount, 500, 999):
        segments[500] = segments[500] += 1;
        break;
      default:
        segments[1000] += 1;
        break;
    }
  }

  return [
    {
      value: segments[0],
      label: "$0-$49",
    },
    {
      value: segments[50],
      label: "$50-$149",
    },
    {
      value: segments[150],
      label: "$150-$249",
    },
    {
      value: segments[250],
      label: "$250-$499",
    },
    {
      value: segments[500],
      label: "$500-$999",
    },
    {
      value: segments[1000],
      label: "$1000+",
    },
  ];
};

const averageGiftPerDonor = (donations, startTime, endTime) => {
  const donorsObj = {};
  donations.forEach((donation) => {
    const amount = parseInt(donation["Account Amount"]);
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    const donorId = donation["Constituent ID"];
    if (startTime && endTime) {
      if (fullYear >= startTime && fullYear <= endTime) {
        if (!(donorId in donorsObj)) {
          donorsObj[donorId] = { total: 0, timesDonated: 0 };
        }
        donorsObj[donorId].total += amount;
        donorsObj[donorId].timesDonated += 1;
      }
    } else {
      if (!(donorId in donorsObj)) {
        donorsObj[donorId] = { total: 0, timesDonated: 0 };
      }
      donorsObj[donorId].total += amount;
      donorsObj[donorId].timesDonated += 1;
    }
  });

  return donorsObj;
};

export const revenueBySegment = (donations, startTime, endTime) => {
  const segments = { 0: 0, 50: 0, 150: 0, 250: 0, 500: 0, 1000: 0 };
  const avgGiftPerDonor = averageGiftPerDonor(donations, startTime, endTime);
  const numberOfDonors = Object.keys(avgGiftPerDonor).length;

  for (const donorId in avgGiftPerDonor) {
    const { total, timesDonated } = avgGiftPerDonor[donorId];
    const amount = total / timesDonated;
    switch (true) {
      case isBetween(amount, 0, 49):
        segments[0] = segments[0] += 1;
        break;
      case isBetween(amount, 50, 149):
        segments[50] = segments[50] += 1;
        break;
      case isBetween(amount, 150, 249):
        segments[150] = segments[150] += 1;
        break;
      case isBetween(amount, 250, 499):
        segments[250] = segments[250] += 1;
        break;
      case isBetween(amount, 500, 999):
        segments[500] = segments[500] += 1;
        break;
      default:
        segments[1000] += 1;
        break;
    }
  }

  return [
    {
      value: Math.round((segments[0] / numberOfDonors) * 100),
      label: "$0-$49",
    },
    {
      value: Math.round((segments[50] / numberOfDonors) * 100),
      label: "$50-$149",
    },
    {
      value: Math.round((segments[150] / numberOfDonors) * 100),
      label: "$150-$249",
    },
    {
      value: Math.round((segments[250] / numberOfDonors) * 100),
      label: "$250-$499",
    },
    {
      value: Math.round((segments[500] / numberOfDonors) * 100),
      label: "$500-$999",
    },
    {
      value: Math.round((segments[1000] / numberOfDonors) * 100),
      label: "$1000+",
    },
  ];
};

/*
  Loop through the years and the first time we recognize a new donor,
  we note the year they donated and increment that years value
*/
export const getFirstTimeDonors = (donations) => {
  const donorsByYear = {};
  const uniqueDonors = [];
  donations.forEach((donation) => {
    const donorId = donation["Constituent ID"];
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

    if (!(fullYear in donorsByYear)) {
      donorsByYear[fullYear] = 0;
    }

    if (!uniqueDonors.includes(donorId)) {
      uniqueDonors.push(donorId);
      donorsByYear[fullYear] = donorsByYear[fullYear] + 1;
    }
  });
  return donorsByYear;
};

/*
  Single donors are donors that have only donated once for a given year. 
  Multi donors are donors that have donated two or more times each year
*/
export const getSingleAndMultiDonors = (donations) => {
  const donorsPerYear = {};
  const uniqueDonorsPerYear = {};
  const multiDonorsPerYear = {};

  donations.forEach((donation) => {
    const donorId = donation["Constituent ID"];
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

    if (!(fullYear in donorsPerYear)) {
      donorsPerYear[fullYear] = {};
    }

    if (!(donorId in donorsPerYear[fullYear])) {
      donorsPerYear[fullYear][donorId] = 1;
    } else if (donorId in donorsPerYear[fullYear]) {
      donorsPerYear[fullYear][donorId] = donorsPerYear[fullYear][donorId] + 1;
    }
  });

  for (const year in donorsPerYear) {
    for (const donor in donorsPerYear[year]) {
      const donationCount = donorsPerYear[year][donor];
      if (donationCount === 1) {
        if (!(year in uniqueDonorsPerYear)) {
          uniqueDonorsPerYear[year] = 1;
        } else {
          uniqueDonorsPerYear[year] = uniqueDonorsPerYear[year] + 1;
        }
      } else if (donationCount > 1) {
        if (!(year in multiDonorsPerYear)) {
          multiDonorsPerYear[year] = 1;
        } else {
          multiDonorsPerYear[year] = multiDonorsPerYear[year] + 1;
        }
      }
    }
  }

  return { single: uniqueDonorsPerYear, multi: multiDonorsPerYear };
};

export const getDonorTypesByYear = (donations, donors) => {
  const donorTypesByYear = {};
  const resultObj = {};

  donations.forEach((donation) => {
    const donorId = donation["Constituent ID"];
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;

    const donorInfo = donorId in donors ? donors[donorId] : null;
    const donorType = donorInfo ? donorInfo["Constituency Code"] : "Unassigned";
    if (!(fullYear in donorTypesByYear)) {
      donorTypesByYear[fullYear] = {};
    }
    if (donorType in donorTypesByYear[fullYear]) {
      donorTypesByYear[fullYear][donorType] =
        donorTypesByYear[fullYear][donorType].add(donorId);
    } else {
      donorTypesByYear[fullYear][donorType] = new Set([donorId]);
    }
  });

  for (const year in donorTypesByYear) {
    resultObj[year] = {};
    for (const donorType in donorTypesByYear[year]) {
      resultObj[year][donorType] = donorTypesByYear[year][donorType].size;
    }
  }

  return resultObj;
};

export const transformDataByYear = (data, key) => {
  const result = {};
  for (const year in data) {
    if (key in data[year]) {
      result[year] = data[year][key];
    }
  }
  return result;
};

export const getUnassigned = (data, keys) => {
  const result = {};
  for (const year in data) {
    for (const key in data[year]) {
      if (!(year in result)) {
        result[year] = 0;
      }
      if (!keys.includes(key)) {
        result[year] = result[year] + data[year][key];
      }
    }
  }
  return result;
};

export const filterYears = (yearsObj, from, to) => {
  const result = {};
  const fromYear = parseInt(from, 10);
  const toYear = parseInt(to, 10);

  Object.keys(yearsObj)
    .filter((year) => {
      const yearInt = parseInt(year, 10);
      return yearInt >= fromYear && yearInt <= toYear;
    })
    .forEach((year) => {
      result[year] = yearsObj[year];
    });

  return result;
};

export const getDonorsPerYear = (donations) => {
  const donorsPerYear = {};
  const returnObj = {};

  donations.forEach((donation) => {
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    const donorId = donation["Constituent ID"];
    if (!(fullYear in donorsPerYear)) {
      donorsPerYear[fullYear] = new Set();
    }
    donorsPerYear[fullYear].add(donorId);
  });

  for (const year in donorsPerYear) {
    returnObj[year] = donorsPerYear[year].size;
  }

  return returnObj;
};

export const totalDonations = (donations) => {
  return donations.length;
};

export const getDateRange = (arrayOfObjects) => {
  // Initialize variables for min and max dates
  let minDate = new Date(arrayOfObjects[0]["Gift Date"]);
  let maxDate = new Date(arrayOfObjects[0]["Gift Date"]);

  // Loop through each object in the array to find min and max dates
  arrayOfObjects.forEach((obj) => {
    const currentDate = new Date(obj["Gift Date"]);
    if (currentDate < minDate) {
      minDate = currentDate;
    }
    if (currentDate > maxDate) {
      maxDate = currentDate;
    }
  });

  return { minDate, maxDate }
};