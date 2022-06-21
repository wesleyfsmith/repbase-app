import { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PublicationMap } from './register-pubs-and-subs';

export const addReactHooksToMethod = (method) => {
  useMethod2(method);
};

export const registerMethodsOnClient = (moduleName, methods) => {
  const methodObj = {};
  const clientObj = {};
  Object.keys(methods).forEach((key) => {
    // method name to avoid collisions
    const methodName = `${moduleName}.${key}`;
    methodObj[methodName] = methods[key];
    clientObj[key] = {
      call(args) {
        return Meteor.call(methodName, args);
      },
    };
  });
  Meteor.methods(methodObj);
};

export const useSubscription = (subscriptionName, args) => {

  const {subscription, data} = useTracker(() => {
    const subscription = Meteor.subscribe(subscriptionName, args);

    const data = PublicationMap[subscriptionName].cursor(args).fetch();


    return {subscription, data}

  }, []);

  return {ready: subscription.ready(), data};

}

export const useMethod = (methodName) => {
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const call = (args) => {
    if (!args) {
      args = [];
    }
    setSubmitted(true);
    Meteor.call(methodName, args, (error, result) => {
      if (error) {
        setErr(error);
        setSubmitted(false);
      } else {
        setRes(result);
        setSubmitted(false);
      }
    });
  };
  return [call, res, err, submitted];
};

// TODO dry this up with useMethod3, can just pass in Meteor.call as the callback
export const useApi = (api) => {
  // const [res, setRes] = useState(null);
  // const [err, setErr] = useState(null);
  // const [pending, setSubmitted] = useState(false);
  // const [callCount, setCallCount] = useState(0);

  const [state, setState] = useState({
    res: null,
    err: null,
    pending: false,
    callCount: 0,
  });

  if (!api) {
    console.warn('You have called useApi with an undefined function. This is most likely a mistake. Please check the useApi() call in your component.');
  }

  // TODO potentially change to use state with promise
  const call = async (args) => {
    // setSubmitted(true);
    setState({
      ...state,
      pending: true,
      callCount: 0,
    });
    const promise = new Promise((resolve, reject) => {
      const cbHandler = (error, result) => {
        if (error) {
          console.error(error);
          // setErr(error);
          // setSubmitted(false);
          setState({
            ...state,
            err: error,
            pending: false,
            callCount: state.callCount + 1,
          });
          reject(error);
        } else {
          setState({
            ...state,
            res: result,
            pending: false,
            callCount: state.callCount + 1,
          });
          resolve(result);
        }
      };
      api.call(args, cbHandler);
    });

    return promise;
    // if (Array.isArray(args)) {
    //   api.call(...args, cbHandler);
    // } else {
    // }
  };

  return {
    ...state, call,
  };
};

export const useMethod3 = (methodName) => {
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [pending, setSubmitted] = useState(false);

  const call = (args) => {
    setSubmitted(true);
    Meteor.call(methodName, args, (error, result) => {
      if (error) {
        console.error(error);
        setErr(error);
        setSubmitted(false);
      } else {
        setRes(result);
        setSubmitted(false);
      }
    });
  };

  // same as above but promise compatible
  // for some reason react doesn't let you do await inside of useEffect
  const callAsync = async (args) => new Promise((resolve, rej) => {
    setSubmitted(true);
    Meteor.call(methodName, args, (error, result) => {
      if (error) {
        console.error(error);
        setErr(error);
        setSubmitted(false);
        rej(error);
      } else {
        setRes(result);
        setSubmitted(false);
        resolve(result);
      }
    });
  });
  return {
    call, res, err, pending, callAsync,
  };
};

export const useCallbackWithArgs = (callback) => {
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [pending, setSubmitted] = useState(false);

  const call = (args) => {
    setSubmitted(true);
    callback(...args, (error, result) => {
      if (error) {
        console.error(error);
        setErr(error);
        setSubmitted(false);
      } else {
        setRes(result);
        setSubmitted(false);
      }
    });
  };

  // same as above but promise compatible
  // for some reason react doesn't let you do await inside of useEffect
  const callAsync = async (args) => new Promise((resolve, rej) => {
    setSubmitted(true);
    callback(...args, (error, result) => {
      if (error) {
        console.error(error);
        setErr(error);
        setSubmitted(false);
        resolve(error);
      } else {
        setRes(result);
        setSubmitted(false);
        resolve(result);
      }
    });
  });

  return {
    call, res, err, pending, callAsync,
  };
};

export const useCallMethod = (methodName, args) => {
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [ready, setReady] = useState(false);

  if (!args) {
    args = [];
  }

  if (!ready) {
    // debugger;
    Meteor.call(methodName, args, (error, result) => {
      if (error) {
        setErr(error);
        setReady(true);
      } else {
        setRes(result);
        setReady(true);
      }
    });
  }
  return { res, err, ready };
};
