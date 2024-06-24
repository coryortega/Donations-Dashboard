function sumAccountAmounts(arrayOfObjects, years = null) {
  let totalSum = 0;
  arrayOfObjects.forEach((obj) => {
    const giftDate = obj["Gift Date"];
    const [, , year] = giftDate.split("/");
    const currentYear = new Date().getFullYear();
    const fullYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
    if (fullYear < currentYear) {
      if (years && fullYear >= currentYear - 1 - years) {
        totalSum += Number(obj["Account Amount"]);
      } else if (!years) {
        totalSum += Number(obj["Account Amount"]);
      }
    }
  });
  return totalSum;
}

const getNumberOfDonors = (donations, years) => {
  let number = 0;

  donations.forEach((obj) => {
    const giftDate = obj["Gift Date"];
    const [, , year] = giftDate.split("/");
    const lastYear = new Date().getFullYear() - 1;
    const giftYear =
      parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);

    if (giftYear >= lastYear - years) {
      number = number + 1;
    }
  });

  return number;
};

export const averageGift = (data, years = null) => {
  const total = sumAccountAmounts(data, years);
  const numberOfDonations = years ? getNumberOfDonors(data, years) : data.length;
  return total / numberOfDonations;
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

const countUniqueDonors = (
  arrayOfObjects,
  startTime = null,
  endTime = null
) => {
  // Use a Set to store unique Constituent IDs
  const uniqueConstituents = new Set();

  // Iterate over each object in the array
  arrayOfObjects.forEach((obj) => {
    // Check if startTime and endTime are provided and filter by time range
    if (startTime && endTime && "Gift Date" in obj) {
      const giftDate = new Date(obj["Gift Date"]).getFullYear();
      if (giftDate >= startTime && giftDate <= endTime) {
        uniqueConstituents.add(obj["Constituent ID"]);
      }
    } else {
      // Add all constituents if no time range is provided
      if ("Constituent ID" in obj) {
        uniqueConstituents.add(obj["Constituent ID"]);
      }
    }
  });
  // Return the size of the Set, which represents the number of unique constituents
  return uniqueConstituents.size;
};

export const averageDonorLifespan = (donations, years = null) => {
  let startTime, endTime, uniqueDonors
  if (years) {
    const lastYear = new Date().getFullYear() - 1;
    startTime = lastYear - years;
    endTime = lastYear;
    uniqueDonors = countUniqueDonors(donations, startTime, endTime);
  } else {
    uniqueDonors = countUniqueDonors(donations) 
  }
  const totalYears = years ? years : calculateTotalYears(donations);
  return Math.round((totalYears / uniqueDonors) * 1000) / 1000;
};

export const averageDonorFrequency = (
  donations,
  startTime = null,
  endTime = null
) => {
  const numberOfDonations = startTime ? getNumberOfDonors(donations, 3) : donations.length;
  const uniqueDonors = countUniqueDonors(donations, startTime, endTime);

  return Math.round(numberOfDonations / uniqueDonors);
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
    if ("Gift Date" in obj) {
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

export const revenuByMonth = (donations, previousYears = 5) => {
  const monthObject = {};

  donations.forEach((donation) => {
    if ("Gift Date" in donation && "Account Amount" in donation) {
      const [, month, abbreviatedYear] = donation["Gift Date"].split("/");
      const amount = donation["Account Amount"];
      const year = mapYearAbbreviationToFullYear(Number(abbreviatedYear));
      const monthAbbreviation = monthMappings[month];
      const currentYear = new Date().getFullYear();

      if (year > currentYear - previousYears) {
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

export const revenueBySegment = (donations, previousYears = 5) => {
  let numberOfDonors = 0;
  const segments = { 0: 0, 50: 0, 150: 0, 250: 0, 500: 0, 1000: 0 };
  donations.forEach((donation) => {
    const amount = parseInt(donation["Account Amount"]);
    const currentYear = new Date().getFullYear();
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    if (parseInt(fullYear) >= currentYear - previousYears) {
      numberOfDonors += 1;
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
  });

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
      value: Math.round((segments[100] / numberOfDonors) * 100),
      label: "$1000+",
    },
  ];
};

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
  const unknownIds = [];

  donations.forEach((donation) => {
    const donorId = donation["Constituent ID"];
    const [, , year] = donation["Gift Date"].split("/");
    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    if (donorId in donors) {
      const donorInfo = donors[donorId];
      const donorType = donorInfo["Constituency Code"];
      if (!(fullYear in donorTypesByYear)) {
        donorTypesByYear[fullYear] = {};
      }
      if (donorType in donorTypesByYear[fullYear]) {
        donorTypesByYear[fullYear][donorType] =
          donorTypesByYear[fullYear][donorType] + 1;
      } else {
        donorTypesByYear[fullYear][donorType] = 1;
      }
    } else {
      unknownIds.push(donorId);
    }
  });
  console.log("Donations with unknown Id's: ", unknownIds.length);
  return donorTypesByYear;
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
