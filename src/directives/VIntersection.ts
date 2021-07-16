export default {
  mounted(el: any, binding: any) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          binding.value;
        }
      },
      { rootMargin: '0px', threshold: 1.0 }
    );

    observer.observe(el);
  },
  name: 'intersection'
};